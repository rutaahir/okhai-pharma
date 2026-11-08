import os
import io
import math
import cv2
import numpy as np
from PIL import Image

try:
    from rapidocr_onnxruntime import RapidOCR
    rapid_ocr_engine = RapidOCR()
except Exception:
    rapid_ocr_engine = None

try:
    import pytesseract
except ImportError:
    pytesseract = None

def deskew_image(cv_image: np.ndarray) -> np.ndarray:
    """Detects text orientation/skew angle and rotates image straight."""
    try:
        gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (7, 7), 0)
        thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]

        coords = np.column_stack(np.where(thresh > 0))
        if len(coords) < 100:
            return cv_image

        rect = cv2.minAreaRect(coords)
        angle = rect[-1]

        if angle < -45:
            angle = -(90 + angle)
        elif angle > 45:
            angle = 90 - angle
        else:
            angle = -angle

        # If significant skew detected (between 1 and 35 degrees)
        if 1.0 < abs(angle) < 35.0:
            (h, w) = cv_image.shape[:2]
            center = (w // 2, h // 2)
            M = cv2.getRotationMatrix2D(center, angle, 1.0)
            rotated = cv2.warpAffine(
                cv_image, M, (w, h),
                flags=cv2.INTER_CUBIC,
                borderMode=cv2.BORDER_REPLICATE
            )
            return rotated
    except Exception:
        pass
    return cv_image

def enhance_for_ocr(cv_image: np.ndarray) -> np.ndarray:
    """Enhances contrast, denoises, and upscales small images for maximum OCR accuracy."""
    h, w = cv_image.shape[:2]

    # 1. Upscale if image is too small
    if w < 1200 or h < 800:
        scale = max(1.5, min(3.0, 1500.0 / max(w, h)))
        cv_image = cv2.resize(cv_image, (0, 0), fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)

    # 2. Convert to LAB color space for luminance contrast enhancement (CLAHE)
    lab = cv2.cvtColor(cv_image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    enhanced = cv2.cvtColor(cv2.merge((cl, a, b)), cv2.COLOR_LAB2BGR)

    # 3. Subtle bilateral denoise (preserves sharp font edges)
    denoised = cv2.bilateralFilter(enhanced, d=5, sigmaColor=50, sigmaSpace=50)
    return denoised

def detect_and_split_cards(cv_image: np.ndarray) -> list[np.ndarray]:
    """Detects if multiple business cards exist in a single photograph and splits them."""
    h, w = cv_image.shape[:2]
    total_area = h * w

    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    card_boxes = []

    for c in contours:
        area = cv2.contourArea(c)
        # Card should be at least 15% of the total area and not more than 85%
        if 0.15 * total_area < area < 0.85 * total_area:
            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.02 * peri, True)
            if len(approx) == 4:
                x, y, cw, ch = cv2.boundingRect(approx)
                aspect = max(cw, ch) / float(min(cw, ch))
                # Standard business card aspect ratio is ~ 1.4 to 1.9
                if 1.2 <= aspect <= 2.2:
                    card_boxes.append((x, y, cw, ch))

    # If we found at least 2 distinct non-overlapping cards
    if len(card_boxes) >= 2:
        crops = []
        for x, y, cw, ch in card_boxes:
            # Add small 2% padding
            pad_x = int(cw * 0.02)
            pad_y = int(ch * 0.02)
            x1 = max(0, x - pad_x)
            y1 = max(0, y - pad_y)
            x2 = min(w, x + cw + pad_x)
            y2 = min(h, y + ch + pad_y)
            crops.append(cv_image[y1:y2, x1:x2])
        return crops

    return [cv_image]

def run_ocr_on_cv_image(cv_image: np.ndarray) -> tuple[str, list[dict], float, str]:
    """
    Runs primary OCR engine (RapidOCR / PaddleOCR ONNX) and returns:
    (raw_text, word_boxes, average_confidence, engine_name)
    """
    # 1. Try RapidOCR
    if rapid_ocr_engine:
        try:
            result, elapse = rapid_ocr_engine(cv_image)
            if result:
                lines = []
                boxes = []
                confidences = []
                for box, text, score in result:
                    text_str = str(text).strip()
                    if text_str:
                        lines.append(text_str)
                        conf = float(score)
                        confidences.append(conf)
                        # Box is 4 corners [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
                        boxes.append({
                            'text': text_str,
                            'box': [[int(pt[0]), int(pt[1])] for pt in box],
                            'confidence': round(conf, 3),
                        })
                raw_text = "\n".join(lines)
                avg_conf = sum(confidences) / len(confidences) if confidences else 0.0
                return raw_text, boxes, round(avg_conf, 3), 'RapidOCR (PaddleOCR-ONNX)'
        except Exception:
            pass

    # 2. Fallback to pytesseract if installed
    if pytesseract:
        try:
            pil_img = Image.fromarray(cv2.cvtColor(cv_image, cv2.COLOR_BGR2RGB))
            data = pytesseract.image_to_data(pil_img, output_type=pytesseract.Output.DICT)
            lines = []
            boxes = []
            confidences = []
            n_boxes = len(data['text'])
            for i in range(n_boxes):
                text_str = data['text'][i].strip()
                conf_val = float(data['conf'][i])
                if text_str and conf_val > 0:
                    lines.append(text_str)
                    conf = conf_val / 100.0
                    confidences.append(conf)
                    boxes.append({
                        'text': text_str,
                        'box': [data['left'][i], data['top'][i], data['width'][i], data['height'][i]],
                        'confidence': round(conf, 3),
                    })
            raw_text = " ".join(lines)
            avg_conf = sum(confidences) / len(confidences) if confidences else 0.0
            return raw_text, boxes, round(avg_conf, 3), 'Tesseract OCR'
        except Exception:
            pass

    return '', [], 0.0, 'None'

def extract_text_from_image(pil_image: Image.Image) -> tuple[str, list[dict], float, str, Image.Image]:
    """
    Complete OCR pipeline:
    1. Deskew
    2. Denoise and enhance contrast
    3. Check for multiple cards
    4. Run OCR
    5. Returns (raw_text, boxes, overall_confidence, engine_name, preprocessed_pil_image)
    """
    cv_img = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

    # Preprocessing
    cv_deskewed = deskew_image(cv_img)
    cv_enhanced = enhance_for_ocr(cv_deskewed)

    # Check for multi-card splitting
    cards = detect_and_split_cards(cv_enhanced)
    all_texts = []
    all_boxes = []
    all_confs = []
    chosen_engine = 'RapidOCR (PaddleOCR-ONNX)'

    for idx, card_img in enumerate(cards):
        text, boxes, conf, engine = run_ocr_on_cv_image(card_img)
        if text:
            all_texts.append(text)
            all_boxes.extend(boxes)
            all_confs.append(conf)
            chosen_engine = engine

    merged_text = "\n\n--- Card Split ---\n\n".join(all_texts) if len(cards) > 1 else (all_texts[0] if all_texts else "")
    merged_conf = sum(all_confs) / len(all_confs) if all_confs else 0.0

    # Convert back to PIL Image for thumbnail storage
    preprocessed_pil = Image.fromarray(cv2.cvtColor(cv_enhanced, cv2.COLOR_BGR2RGB))

    return merged_text, all_boxes, round(merged_conf, 3), chosen_engine, preprocessed_pil

