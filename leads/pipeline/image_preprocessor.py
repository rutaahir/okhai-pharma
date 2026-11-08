"""
Camera & Business Card Image Preprocessing Pipeline for Okhai Pharma Lead Module.
Implements Phase 3:
1. Normalization (EXIF transpose, HEIC/HEIF conversion, alpha/CMYK/palette handling, max 2500px).
2. Card Detection & Perspective Quadrilateral Crop (4-point transform, multi-card detection).
3. Orientation Recovery (0, 90, 180, 270 degrees).
4. Enhancement Variants (CLAHE, Adaptive Threshold, Unsharp Mask, Shadow Division).
5. Quality Gate (Laplacian blur, brightness, glare detection).
6. Multiscale QR/Barcode Scanner.
"""

import io
import math
import logging
import cv2
import numpy as np
from PIL import Image, ImageOps

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass

try:
    import zxingcpp
except ImportError:
    zxingcpp = None

logger = logging.getLogger(__name__)

MAX_PROCESSING_DIMENSION = 2500

def normalize_image(image_input: bytes | Image.Image | np.ndarray) -> Image.Image:
    """
    Normalizes camera photos:
    - Fixes EXIF orientation via ImageOps.exif_transpose.
    - Converts HEIC/HEIF, RGBA, CMYK, Palette (P) to clean RGB.
    - Caps longest side at 2500 px while preserving original aspect ratio.
    """
    if isinstance(image_input, bytes):
        pil_img = Image.open(io.BytesIO(image_input))
    elif isinstance(image_input, np.ndarray):
        pil_img = Image.fromarray(cv2.cvtColor(image_input, cv2.COLOR_BGR2RGB))
    elif isinstance(image_input, Image.Image):
        pil_img = image_input.copy()
    else:
        raise ValueError(f"Unsupported image type: {type(image_input)}")

    # 1. Apply EXIF orientation
    try:
        pil_img = ImageOps.exif_transpose(pil_img)
    except Exception as e:
        logger.warning(f"EXIF transpose failed: {e}")

    # 2. Convert to RGB
    if pil_img.mode != 'RGB':
        if pil_img.mode in ('RGBA', 'LA'):
            # Paste on solid white background to handle transparent PNGs cleanly
            background = Image.new('RGB', pil_img.size, (255, 255, 255))
            background.paste(pil_img, mask=pil_img.split()[-1])
            pil_img = background
        else:
            pil_img = pil_img.convert('RGB')

    # 3. Cap longest dimension at 2500 px
    w, h = pil_img.size
    max_dim = max(w, h)
    if max_dim > MAX_PROCESSING_DIMENSION:
        scale = MAX_PROCESSING_DIMENSION / float(max_dim)
        new_w = int(round(w * scale))
        new_h = int(round(h * scale))
        pil_img = pil_img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    return pil_img

def pil_to_cv2(pil_img: Image.Image) -> np.ndarray:
    """Converts PIL RGB Image to OpenCV BGR numpy array."""
    return cv2.cvtColor(np.array(pil_img), cv2.COLOR_RGB2BGR)

def cv2_to_pil(cv_img: np.ndarray) -> Image.Image:
    """Converts OpenCV BGR numpy array to PIL RGB Image."""
    return Image.fromarray(cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB))

def evaluate_quality_gate(cv_img: np.ndarray) -> dict:
    """
    Phase 3.5: Quality Gate.
    Computes blur (variance of Laplacian), brightness, and glare.
    Does NOT fail or fabricate; returns truthful warnings for user feedback.
    """
    gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
    
    # 1. Blur Detection (Laplacian Variance)
    lap_var = cv2.Laplacian(gray, cv2.CV_64F).var()
    is_blurry = lap_var < 75.0
    
    # 2. Brightness Mean
    mean_val = float(np.mean(gray))
    is_too_dark = mean_val < 45.0
    is_too_bright = mean_val > 220.0
    
    # 3. Glare Detection (Fraction of blown-out white pixels)
    glare_fraction = float(np.sum(gray >= 248)) / float(gray.size)
    has_glare = glare_fraction > 0.10

    warnings = []
    if is_blurry:
        warnings.append("Image appears blurry. Text details might be hard to read.")
    if is_too_dark:
        warnings.append("Image is dimly lit. Consider taking with flash or under direct light.")
    elif is_too_bright or has_glare:
        warnings.append("Glare or overexposure detected on the card surface.")

    return {
        'is_blurry': is_blurry,
        'laplacian_var': round(lap_var, 2),
        'mean_brightness': round(mean_val, 2),
        'glare_fraction': round(glare_fraction, 4),
        'is_too_dark': is_too_dark,
        'has_glare': has_glare,
        'is_acceptable': not (is_blurry and (is_too_dark or has_glare)),
        'warnings': warnings,
    }

def order_points(pts: np.ndarray) -> np.ndarray:
    """Orders 4 points: [top-left, top-right, bottom-right, bottom-left]."""
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]      # TL has smallest sum
    rect[2] = pts[np.argmax(s)]      # BR has largest sum
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]   # TR has smallest difference (y - x is minimum)
    rect[3] = pts[np.argmax(diff)]   # BL has largest difference
    return rect

def four_point_transform(image: np.ndarray, pts: np.ndarray) -> np.ndarray:
    """Applies perspective transform to unwarp quadrilateral into top-down flat card view."""
    rect = order_points(pts)
    (tl, tr, br, bl) = rect

    width_bottom = np.linalg.norm(br - bl)
    width_top = np.linalg.norm(tr - tl)
    max_w = max(int(width_bottom), int(width_top))

    height_right = np.linalg.norm(tr - br)
    height_left = np.linalg.norm(tl - bl)
    max_h = max(int(height_right), int(height_left))

    if max_w < 60 or max_h < 40:
        return image

    dst = np.array([
        [0, 0],
        [max_w - 1, 0],
        [max_w - 1, max_h - 1],
        [0, max_h - 1]
    ], dtype="float32")

    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(image, M, (max_w, max_h), flags=cv2.INTER_CUBIC)
    return warped

def detect_card_quads(cv_image: np.ndarray) -> list[dict]:
    """
    Phase 3.2: Card Detection & Perspective Crop.
    Finds business card quadrilaterals using edge detection, morphological closing,
    and approxPolyDP. Validates card-like aspect ratio (1.1 to 2.4) and area.
    Supports multiple non-overlapping cards.
    Falls back gracefully to full image if no quadrilateral is found.
    """
    h, w = cv_image.shape[:2]
    total_area = float(h * w)

    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.bilateralFilter(gray, 9, 75, 75)

    edge_methods = [
        cv2.Canny(blurred, 20, 60),
        cv2.Canny(blurred, 30, 100),
        cv2.Canny(blurred, 50, 150),
    ]

    card_candidates = []

    for edges in edge_methods:
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (7, 7))
        closed = cv2.morphologyEx(edges, cv2.MORPH_CLOSE, kernel)
        cnts, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        for c in cnts:
            area = cv2.contourArea(c)
            # Minimum card size: 10% of photo, maximum 98%
            if area < 0.10 * total_area or area > 0.98 * total_area:
                continue

            peri = cv2.arcLength(c, True)
            approx = cv2.approxPolyDP(c, 0.025 * peri, True)

            if len(approx) == 4 and cv2.isContourConvex(approx):
                pts = approx.reshape(4, 2)
                x, y, bw, bh = cv2.boundingRect(pts)
                aspect = max(bw, bh) / float(max(1, min(bw, bh)))
                # Business card aspect ratio is typically 1.2 to 2.2
                if 1.15 <= aspect <= 2.45:
                    # Check for overlap with existing candidates
                    is_duplicate = False
                    for existing_area, existing_pts, _ in card_candidates:
                        dist = np.linalg.norm(np.mean(pts, axis=0) - np.mean(existing_pts, axis=0))
                        if dist < 0.15 * max(w, h):
                            is_duplicate = True
                            break
                    if not is_duplicate:
                        card_candidates.append((area, pts, aspect))

    if card_candidates:
        # Sort candidates by area descending
        card_candidates.sort(key=lambda x: x[0], reverse=True)
        results = []
        for area, pts, aspect in card_candidates:
            warped = four_point_transform(cv_image, pts)
            results.append({
                'crop': warped,
                'quad': pts.tolist(),
                'is_cropped': True,
                'area_ratio': round(area / total_area, 3),
                'aspect_ratio': round(aspect, 2),
            })
        return results

    # Fallback to full image
    return [{
        'crop': cv_image,
        'quad': None,
        'is_cropped': False,
        'area_ratio': 1.0,
        'aspect_ratio': round(max(w, h) / float(max(1, min(w, h))), 2),
    }]

def generate_enhancement_variants(cv_img: np.ndarray) -> dict[str, np.ndarray]:
    """
    Phase 3.4: Enhancement Variants.
    Generates:
    1. original: raw normalized image
    2. clahe: LAB contrast-limited adaptive histogram equalization
    3. adaptive_threshold: binarized contrast for faint text
    4. unsharp_mask: high-frequency sharpening for small fonts
    5. shadow_removed: background division to neutralize uneven phone lighting
    """
    variants = {'original': cv_img}

    # 1. CLAHE Contrast
    try:
        lab = cv2.cvtColor(cv_img, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        clahe = cv2.createCLAHE(clipLimit=2.2, tileGridSize=(8, 8))
        cl = clahe.apply(l)
        variants['clahe'] = cv2.cvtColor(cv2.merge((cl, a, b)), cv2.COLOR_LAB2BGR)
    except Exception as e:
        logger.debug(f"CLAHE failed: {e}")

    # 2. Unsharp Mask
    try:
        gaussian_blur = cv2.GaussianBlur(cv_img, (0, 0), 2.0)
        variants['unsharp'] = cv2.addWeighted(cv_img, 1.5, gaussian_blur, -0.5, 0)
    except Exception as e:
        logger.debug(f"Unsharp mask failed: {e}")

    # 3. Shadow Removal using Background Division
    try:
        gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        dilated = cv2.dilate(gray, np.ones((7, 7), np.uint8))
        bg_blur = cv2.medianBlur(dilated, 21)
        diff = 255 - cv2.absdiff(gray, bg_blur)
        norm = cv2.normalize(diff, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
        variants['shadow_removed'] = cv2.cvtColor(norm, cv2.COLOR_GRAY2BGR)
    except Exception as e:
        logger.debug(f"Shadow removal failed: {e}")

    # 4. Adaptive Threshold (Binarized for OCR)
    try:
        gray = cv2.cvtColor(cv_img, cv2.COLOR_BGR2GRAY)
        adapt = cv2.adaptiveThreshold(
            gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY, 25, 11
        )
        variants['adaptive_threshold'] = cv2.cvtColor(adapt, cv2.COLOR_GRAY2BGR)
    except Exception as e:
        logger.debug(f"Adaptive threshold failed: {e}")

    return variants

def scan_all_qrs(cv_img: np.ndarray) -> list[dict]:
    """
    Phase 3.6: Multi-scale and multi-rotation QR/Barcode scan.
    Uses zxingcpp or OpenCV QRCodeDetector.
    """
    payloads = []
    seen = set()

    if zxingcpp:
        # Test original, 90, 180, 270 rotations
        curr = cv_img
        for rot in [0, 90, 180, 270]:
            try:
                results = zxingcpp.read_barcodes(curr)
                for res in results:
                    text = res.text.strip()
                    if text and text not in seen:
                        seen.add(text)
                        payloads.append({
                            'text': text,
                            'format': str(res.format),
                            'rotation': rot
                        })
            except Exception:
                pass
            curr = cv2.rotate(curr, cv2.ROTATE_90_CLOCKWISE)

    # Fallback to OpenCV QRCodeDetector
    if not payloads:
        detector = cv2.QRCodeDetector()
        curr = cv_img
        for rot in [0, 90, 180, 270]:
            try:
                data, points, _ = detector.detectAndDecode(curr)
                if data and data.strip() and data.strip() not in seen:
                    seen.add(data.strip())
                    payloads.append({
                        'text': data.strip(),
                        'format': 'QR_CODE',
                        'rotation': rot
                    })
            except Exception:
                pass
            curr = cv2.rotate(curr, cv2.ROTATE_90_CLOCKWISE)

    return payloads

