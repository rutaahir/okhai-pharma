"""
Generates 25 realistic test images with ground-truth JSON files for Phase 6 evaluation.
Includes:
- Direct WhatsApp camera photos (failing user photo, colleague cards)
- Angles and perspective distortions
- Rotations (90, 180, 270 degrees)
- Lighting variations (low light, flash glare)
- Multi-card layouts
- Blurry / unreadable photos
- Multilingual and QR vCard layouts
"""

import os
import io
import json
import cv2
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageDraw, ImageFont

TEST_DIR = os.path.join(os.path.dirname(__file__), 'test_images')
os.makedirs(TEST_DIR, exist_ok=True)

# Base source images from data/lead_media
SOURCE_IMAGES = {
    'sunnybhai': r'data\lead_media\files\32cadcd4-b6a9-4d26-9f57-f2570fd30c65\0d4ec3e0384544498147849dcf4790ff.jpeg',
    'harshil': r'data\lead_media\files\08621a2b-f9da-4dfb-b975-dd84fa6f47d5\565e78d0bd2846dba835ebe54175118a.jpg',
    'bhargav': r'data\lead_media\files\941b9f2e-407a-4679-a596-83da2e951d2e\1de0daa954cb4d749372f569d5813e80.jpeg',
}

GROUND_TRUTHS = {
    'sunnybhai': {
        'name': 'Sunnybhai',
        'company': 'Shri Siddhivinayak Enterprise',
        'phones': ['+916354955982'],
        'emails': [],
        'address': 'Radhika Park Part-1, Arbudanagar, Chandlodiya, Gota Road, Ahmedabad.',
        'legible': True
    },
    'harshil': {
        'name': 'Harshil Shah',
        'company': 'TechnoAdviser',
        'phones': ['+919876543210'],
        'emails': ['harshil.shah@technoadviser.com'],
        'address': 'A-302, Titanium Square, S.G. Highway, Ahmedabad - 380054, Gujarat, India',
        'legible': True
    },
    'bhargav': {
        'name': 'Bhargav D. Mehta',
        'company': 'TECHNOADVISER TECHNOLOGIES PVT. LTD',
        'phones': ['+918490911181'],
        'emails': ['info@technoadviser.com'],
        'address': '212, Samaan II, Opp. Shell Petrol Pump, 100 Feet Anand Nagar Rd., Prahlad Nagar, Satellite, Ahmedabad - 380015, Gujarat - India',
        'legible': True
    }
}

def save_case(idx: int, filename: str, img: Image.Image, truth: dict, category: str):
    prefix = f"{idx:02d}_{filename}"
    img_path = os.path.join(TEST_DIR, f"{prefix}.jpg")
    json_path = os.path.join(TEST_DIR, f"{prefix}.json")
    
    img.save(img_path, format='JPEG', quality=88)
    truth['category'] = category
    truth['image_file'] = f"{prefix}.jpg"
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(truth, f, indent=2, ensure_ascii=False)
    print(f"[{idx:02d}] Generated {prefix} ({category})")

def main():
    loaded_imgs = {}
    for k, p in SOURCE_IMAGES.items():
        if os.path.exists(p):
            loaded_imgs[k] = Image.open(p).convert('RGB')
        else:
            # Fallback canvas
            loaded_imgs[k] = Image.new('RGB', (1200, 800), (240, 240, 240))

    case_idx = 1

    # 1. User's failing WhatsApp photo (original)
    save_case(case_idx, "whatsapp_user_failing_card", loaded_imgs['sunnybhai'], GROUND_TRUTHS['sunnybhai'].copy(), "whatsapp_camera")
    case_idx += 1

    # 2. Harshil Shah card (original)
    save_case(case_idx, "technoadviser_harshil_card", loaded_imgs['harshil'], GROUND_TRUTHS['harshil'].copy(), "clean_card")
    case_idx += 1

    # 3. Bhargav Mehta card (original)
    save_case(case_idx, "technoadviser_bhargav_card", loaded_imgs['bhargav'], GROUND_TRUTHS['bhargav'].copy(), "whatsapp_camera")
    case_idx += 1

    # 4. Sunnybhai rotated 90 deg
    rot90 = loaded_imgs['sunnybhai'].rotate(90, expand=True)
    save_case(case_idx, "sunnybhai_rotated_90", rot90, GROUND_TRUTHS['sunnybhai'].copy(), "orientation_90")
    case_idx += 1

    # 5. Sunnybhai rotated 180 deg
    rot180 = loaded_imgs['sunnybhai'].rotate(180, expand=True)
    save_case(case_idx, "sunnybhai_rotated_180", rot180, GROUND_TRUTHS['sunnybhai'].copy(), "orientation_180")
    case_idx += 1

    # 6. Sunnybhai rotated 270 deg
    rot270 = loaded_imgs['sunnybhai'].rotate(270, expand=True)
    save_case(case_idx, "sunnybhai_rotated_270", rot270, GROUND_TRUTHS['sunnybhai'].copy(), "orientation_270")
    case_idx += 1

    # 7. Harshil card rotated 90 deg
    h_rot90 = loaded_imgs['harshil'].rotate(90, expand=True)
    save_case(case_idx, "harshil_rotated_90", h_rot90, GROUND_TRUTHS['harshil'].copy(), "orientation_90")
    case_idx += 1

    # 8. Bhargav card rotated 180 deg
    b_rot180 = loaded_imgs['bhargav'].rotate(180, expand=True)
    save_case(case_idx, "bhargav_rotated_180", b_rot180, GROUND_TRUTHS['bhargav'].copy(), "orientation_180")
    case_idx += 1

    # 9. Low light / dim photo (brightness 0.4)
    enhancer = ImageEnhance.Brightness(loaded_imgs['sunnybhai'])
    dimmed = enhancer.enhance(0.42)
    save_case(case_idx, "sunnybhai_low_light", dimmed, GROUND_TRUTHS['sunnybhai'].copy(), "low_light")
    case_idx += 1

    # 10. Low light Harshil card
    h_dimmed = ImageEnhance.Brightness(loaded_imgs['harshil']).enhance(0.45)
    save_case(case_idx, "harshil_low_light", h_dimmed, GROUND_TRUTHS['harshil'].copy(), "low_light")
    case_idx += 1

    # 11. Card on dark wooden table (with padding)
    sunny_cv = np.array(loaded_imgs['sunnybhai'])
    table_bg = np.full((sunny_cv.shape[0] + 300, sunny_cv.shape[1] + 300, 3), 40, dtype=np.uint8)
    table_bg[150:150+sunny_cv.shape[0], 150:150+sunny_cv.shape[1]] = sunny_cv
    save_case(case_idx, "sunnybhai_dark_table_background", Image.fromarray(table_bg), GROUND_TRUTHS['sunnybhai'].copy(), "dark_table_bg")
    case_idx += 1

    # 12. Glare spot overlay (camera flash simulation)
    glare_img = loaded_imgs['harshil'].copy()
    draw = ImageDraw.Draw(glare_img, 'RGBA')
    # Soft translucent white glare on the top right
    draw.ellipse([(800, 50), (1200, 450)], fill=(255, 255, 255, 160))
    save_case(case_idx, "harshil_surface_glare", glare_img, GROUND_TRUTHS['harshil'].copy(), "glare")
    case_idx += 1

    # 13. WhatsApp aggressive compression (JPEG quality 18)
    buf = io.BytesIO()
    loaded_imgs['sunnybhai'].save(buf, format='JPEG', quality=18)
    comp_img = Image.open(buf)
    save_case(case_idx, "sunnybhai_whatsapp_high_compression", comp_img, GROUND_TRUTHS['sunnybhai'].copy(), "whatsapp_compression")
    case_idx += 1

    # 14. Slight perspective keystone distortion (camera tilt ~15 deg)
    cv_img = np.array(loaded_imgs['harshil'])
    h, w = cv_img.shape[:2]
    pts1 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    pts2 = np.float32([[w*0.08, h*0.05], [w*0.92, h*0.02], [0, h*0.98], [w, h*0.95]])
    M = cv2.getPerspectiveTransform(pts1, pts2)
    warped_cv = cv2.warpPerspective(cv_img, M, (w, h), borderValue=(220, 220, 220))
    save_case(case_idx, "harshil_perspective_angle", Image.fromarray(warped_cv), GROUND_TRUTHS['harshil'].copy(), "perspective_tilt")
    case_idx += 1

    # 15. Bhargav perspective keystone distortion
    b_cv = np.array(loaded_imgs['bhargav'])
    bh, bw = b_cv.shape[:2]
    b_pts1 = np.float32([[0, 0], [bw, 0], [0, bh], [bw, bh]])
    b_pts2 = np.float32([[bw*0.05, bh*0.08], [bw*0.95, bh*0.04], [bw*0.02, bh], [bw*0.98, bh*0.92]])
    b_M = cv2.getPerspectiveTransform(b_pts1, b_pts2)
    b_warped = cv2.warpPerspective(b_cv, b_M, (bw, bh), borderValue=(210, 210, 210))
    save_case(case_idx, "bhargav_perspective_angle", Image.fromarray(b_warped), GROUND_TRUTHS['bhargav'].copy(), "perspective_tilt")
    case_idx += 1

    # 16. Multi-card photo (two cards in one image side-by-side)
    mc_w = loaded_imgs['sunnybhai'].width // 2 + loaded_imgs['harshil'].width // 2
    mc_h = max(loaded_imgs['sunnybhai'].height // 2, loaded_imgs['harshil'].height // 2) + 100
    multi_card = Image.new('RGB', (mc_w + 100, mc_h), (230, 230, 230))
    multi_card.paste(loaded_imgs['sunnybhai'].resize((loaded_imgs['sunnybhai'].width // 2, loaded_imgs['sunnybhai'].height // 2)), (30, 50))
    multi_card.paste(loaded_imgs['harshil'].resize((loaded_imgs['harshil'].width // 2, loaded_imgs['harshil'].height // 2)), (loaded_imgs['sunnybhai'].width // 2 + 50, 50))
    save_case(case_idx, "multi_card_photo_two_cards", multi_card, GROUND_TRUTHS['sunnybhai'].copy(), "multi_card")
    case_idx += 1

    # 17. Multilingual Pharma Card: English + Gujarati
    pharma_card = Image.new('RGB', (1050, 600), (255, 255, 255))
    p_draw = ImageDraw.Draw(pharma_card)
    p_draw.rectangle([(20, 20), (1030, 580)], outline=(30, 61, 42), width=3)
    p_draw.text((60, 60), "OKHAI PHARMA INTERMEDIATES PVT. LTD.", fill=(30, 61, 42))
    p_draw.text((60, 100), "ઓખાઈ ફાર્મા ઇન્ટરમીડિયેટ્સ પ્રાઇવેટ લિમિટેડ", fill=(91, 154, 60))
    p_draw.text((60, 160), "Dr. Rutvik Ahir", fill=(10, 30, 15))
    p_draw.text((60, 200), "Commercial Director & Head of Quality", fill=(80, 80, 80))
    p_draw.text((60, 280), "Phone: +91 79900 82565", fill=(30, 61, 42))
    p_draw.text((60, 320), "Email: info@okhaipharma.com", fill=(30, 61, 42))
    p_draw.text((60, 360), "Web: https://www.okhaipharma.com", fill=(30, 61, 42))
    p_draw.text((60, 420), "Plant: Sr No. 538, Ashapuri-Changa Road, Vil-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460", fill=(50, 50, 50))
    save_case(case_idx, "multilingual_pharma_card_gujarati", pharma_card, {
        'name': 'Dr. Rutvik Ahir',
        'company': 'OKHAI PHARMA INTERMEDIATES PVT. LTD.',
        'phones': ['+917990082565'],
        'emails': ['info@okhaipharma.com'],
        'address': 'Sr No. 538, Ashapuri-Changa Road, Vil-Kasor, Ta-Sojitra, Dist-Anand, Gujarat 388460',
        'legible': True
    }, "multilingual")
    case_idx += 1

    # 18. Multilingual Pharma Card: English + Hindi
    hindi_card = Image.new('RGB', (1050, 600), (250, 252, 248))
    h_draw = ImageDraw.Draw(hindi_card)
    h_draw.rectangle([(20, 20), (1030, 580)], outline=(40, 80, 40), width=3)
    h_draw.text((60, 60), "GUJARAT ALKALIES & CHEMICALS LTD", fill=(20, 50, 30))
    h_draw.text((60, 100), "गुजरात अल्कलीज एंड केमिकल्स लिमिटेड", fill=(80, 130, 50))
    h_draw.text((60, 160), "Mr. Sanjay Sharma", fill=(10, 10, 10))
    h_draw.text((60, 200), "Vice President - Procurement", fill=(70, 70, 70))
    h_draw.text((60, 280), "Mobile: +91 94270 55123", fill=(20, 50, 30))
    h_draw.text((60, 320), "Email: sanjay.sharma@gacl.co.in", fill=(20, 50, 30))
    h_draw.text((60, 380), "P.O. Petrochemicals, Dahej Industrial Estate, Bharuch - 392130, Gujarat", fill=(60, 60, 60))
    save_case(case_idx, "multilingual_pharma_card_hindi", hindi_card, {
        'name': 'Mr. Sanjay Sharma',
        'company': 'GUJARAT ALKALIES & CHEMICALS LTD',
        'phones': ['+919427055123'],
        'emails': ['sanjay.sharma@gacl.co.in'],
        'address': 'P.O. Petrochemicals, Dahej Industrial Estate, Bharuch - 392130, Gujarat',
        'legible': True
    }, "multilingual")
    case_idx += 1

    # 19. vCard QR Code Card
    qr_card = Image.new('RGB', (1000, 600), (255, 255, 255))
    qr_draw = ImageDraw.Draw(qr_card)
    qr_draw.rectangle([(20, 20), (980, 580)], outline=(0, 0, 0), width=2)
    qr_draw.text((60, 80), "Zydus Lifesciences Ltd.", fill=(0, 0, 0))
    qr_draw.text((60, 140), "Ketan Patel", fill=(0, 0, 0))
    qr_draw.text((60, 180), "Supply Chain Manager", fill=(100, 100, 100))
    qr_draw.text((60, 260), "Tel: +91 98250 99881", fill=(0, 0, 0))
    qr_draw.text((60, 300), "Email: ketan.patel@zyduslife.com", fill=(0, 0, 0))
    qr_draw.text((60, 360), "Zydus Corporate Park, SG Highway, Ahmedabad 382481", fill=(80, 80, 80))
    save_case(case_idx, "qr_vcard_corporate_card", qr_card, {
        'name': 'Ketan Patel',
        'company': 'Zydus Lifesciences Ltd.',
        'phones': ['+919825099881'],
        'emails': ['ketan.patel@zyduslife.com'],
        'address': 'Zydus Corporate Park, SG Highway, Ahmedabad 382481',
        'legible': True
    }, "qr_vcard")
    case_idx += 1

    # 20. B2B Product Brochure Page
    brochure = Image.new('RGB', (1200, 1600), (252, 252, 250))
    b_draw = ImageDraw.Draw(brochure)
    b_draw.rectangle([(40, 40), (1160, 1560)], outline=(180, 180, 180), width=1)
    b_draw.text((100, 100), "PRODUCT SPECIFICATION DOSSIER - NICOTINE USP 99.5%+", fill=(30, 61, 42))
    b_draw.text((100, 180), "Manufactured by: Okhai Pharma Intermediates Pvt. Ltd.", fill=(50, 50, 50))
    b_draw.text((100, 240), "Commercial Liaison: Parth Visana (VP Global Accounts)", fill=(10, 30, 15))
    b_draw.text((100, 300), "Direct Line: +91 98980 12345 | Export Desk: export@okhaipharma.com", fill=(30, 61, 42))
    b_draw.text((100, 360), "Factory Address: Survey 538, Kasor Village, Anand District, Gujarat 388460", fill=(60, 60, 60))
    b_draw.text((100, 440), "Specifications: Purity >= 99.5%, Heavy metals < 10 ppm, Colorless to pale yellow.", fill=(80, 80, 80))
    save_case(case_idx, "brochure_commercial_dossier", brochure, {
        'name': 'Parth Visana',
        'company': 'Okhai Pharma Intermediates Pvt. Ltd.',
        'phones': ['+919898012345'],
        'emails': ['export@okhaipharma.com'],
        'address': 'Survey 538, Kasor Village, Anand District, Gujarat 388460',
        'legible': True
    }, "brochure")
    case_idx += 1

    # 21. Heavily Blurry photo (should fail honestly, 0 fake strings)
    blurry_sunny = loaded_imgs['sunnybhai'].filter(ImageFilter.GaussianBlur(radius=28))
    save_case(case_idx, "heavily_blurry_unreadable", blurry_sunny, {
        'name': None,
        'company': None,
        'phones': [],
        'emails': [],
        'address': None,
        'legible': False
    }, "unreadable_blurry")
    case_idx += 1

    # 22. Heavily Blurry Harshil card
    blurry_h = loaded_imgs['harshil'].filter(ImageFilter.GaussianBlur(radius=32))
    save_case(case_idx, "harshil_extreme_blur", blurry_h, {
        'name': None,
        'company': None,
        'phones': [],
        'emails': [],
        'address': None,
        'legible': False
    }, "unreadable_blurry")
    case_idx += 1

    # 23. Completely black / blank image
    black_img = Image.new('RGB', (1000, 700), (8, 8, 8))
    save_case(case_idx, "solid_black_no_content", black_img, {
        'name': None,
        'company': None,
        'phones': [],
        'emails': [],
        'address': None,
        'legible': False
    }, "unreadable_blank")
    case_idx += 1

    # 24. Heavy Noise / Textured Background without card
    noise_cv = np.random.randint(50, 180, (800, 1200, 3), dtype=np.uint8)
    save_case(case_idx, "random_texture_no_card", Image.fromarray(noise_cv), {
        'name': None,
        'company': None,
        'phones': [],
        'emails': [],
        'address': None,
        'legible': False
    }, "unreadable_noise")
    case_idx += 1

    # 25. Card back side (Logo only, no person, phone, email, or address)
    back_side_path = r'data\lead_media\files\51835125-1d85-4e44-8e42-86f76650d0e3\e53c3b4dec264bac823c14c33806bf30.jpeg'
    if os.path.exists(back_side_path):
        back_img = Image.open(back_side_path).convert('RGB')
    else:
        back_img = Image.new('RGB', (1040, 781), (255, 255, 255))
    save_case(case_idx, "card_back_logo_only", back_img, {
        'name': None,
        'company': 'TECHNOADVISER TECHNOLOGIES PVT. LTD',
        'phones': [],
        'emails': [],
        'address': None,
        'legible': True
    }, "card_back")

    print(f"\nSuccessfully generated 25 benchmark test cases in {TEST_DIR}")

if __name__ == '__main__':
    main()

