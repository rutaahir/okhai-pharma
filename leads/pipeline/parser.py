import re
import phonenumbers
from phonenumbers import PhoneNumberType

INDIAN_STATES = [
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh', 'Delhi',
    'Karnataka', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Uttar Pradesh',
    'Punjab', 'Haryana', 'West Bengal', 'Kerala', 'Bihar', 'Goa',
    'Himachal Pradesh', 'Odisha', 'Uttarakhand', 'Jharkhand', 'Assam',
    'Chandigarh', 'Daman and Diu', 'Dadra and Nagar Haveli'
]

INDIAN_INDUSTRIAL_CITIES = [
    'Ankleshwar', 'Panoli', 'Dahej', 'Vapi', 'Surat', 'Vadodara', 'Baroda',
    'Ahmedabad', 'Bharuch', 'Rajkot', 'Jamnagar', 'Bhavnagar', 'Gandhinagar',
    'Valsad', 'Morbi', 'Halol', 'Nandesari', 'Kadi', 'Kalol', 'Chhatral',
    'Mumbai', 'Navi Mumbai', 'Thane', 'Tarapur', 'Pune', 'Bhiwandi', 'Aurangabad',
    'Hyderabad', 'Bengaluru', 'Bangalore', 'Chennai', 'Indore', 'Bhopal',
    'Baddi', 'Solan', 'Gurgaon', 'Gurugram', 'Noida', 'Faridabad', 'Visakhapatnam'
]

COMPANY_SUFFIX_KEYWORDS = [
    'PVT LTD', 'PRIVATE LIMITED', 'LTD', 'LIMITED', 'LLP', 'INC', 'CORP',
    'CORPORATION', 'INDUSTRIES', 'ENTERPRISES', 'CHEMICALS', 'PHARMA',
    'PHARMACEUTICALS', 'INTERMEDIATES', 'LABORATORIES', 'LABS', 'LIFE SCIENCES',
    'SYNTHETICS', 'ORGANICS', 'BIOTECH', 'FORMULATIONS', 'EXPORTS', 'IMPORTS',
    'TRADING CO', 'SOLUTIONS', 'TECHNOLOGIES', 'WORKS', 'AGRO', 'SPECIALTIES'
]

DESIGNATION_KEYWORDS = [
    'MANAGING DIRECTOR', 'EXECUTIVE DIRECTOR', 'DIRECTOR', 'CHAIRMAN',
    'CHIEF EXECUTIVE OFFICER', 'CEO', 'PROPRIETOR', 'PARTNER', 'FOUNDER',
    'CO-FOUNDER', 'PRESIDENT', 'VICE PRESIDENT', 'VP', 'GENERAL MANAGER',
    'GM', 'MANAGER', 'COMMERCIAL HEAD', 'COMMERCIAL MANAGER', 'PLANT HEAD',
    'PLANT MANAGER', 'FACTORY MANAGER', 'QC HEAD', 'QA MANAGER', 'R&D HEAD',
    'SCIENTIST', 'CHEMIST', 'PROCUREMENT HEAD', 'PURCHASE MANAGER',
    'SALES HEAD', 'MARKETING EXECUTIVE', 'BUSINESS DEVELOPMENT MANAGER',
    'BDM', 'ADVISOR', 'CONSULTANT', 'OFFICER'
]

HONORIFICS = ['MR', 'MR.', 'MRS', 'MRS.', 'MS', 'MS.', 'DR', 'DR.', 'SHRI', 'SMT', 'SMT.', 'ER', 'ER.', 'PROF', 'PROF.']

ADDRESS_MARKERS = [
    'PLOT NO', 'SURVEY NO', 'GIDC', 'ESTATE', 'INDUSTRIAL ESTATE', 'PHASE',
    'ROAD', 'CROSS ROAD', 'HIGHWAY', 'NEAR', 'OPP', 'OPPOSITE', 'BEHIND',
    'BESIDE', 'FLOOR', 'BLOCK', 'SECTOR', 'NAGAR', 'SOCIETY', 'COMPLEX',
    'TOWER', 'BUILDING', 'P.O. BOX', 'PIN', 'PIN CODE', 'POSTAL CODE', 'POST'
]

# Patterns to actively exclude from phone candidate detection
GST_PATTERN = re.compile(r'\b[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}\b', re.IGNORECASE)
DATE_PATTERN = re.compile(r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b')
PIN_ONLY_PATTERN = re.compile(r'^\s*[1-9][0-9]{5}\s*$')

def clean_ocr_line(line: str) -> str:
    """Removes stray symbols and normalizes whitespace."""
    return re.sub(r'\s+', ' ', line).strip()

def extract_phones(text: str, default_region: str = 'IN') -> tuple[list[dict], float]:
    """
    Tolerantly extracts and validates phone numbers using python-phonenumbers.
    Distinguishes mobile vs landline, excludes GST/PIN codes/dates, and standardizes to E.164.
    """
    phones = []
    seen_e164 = set()

    # Pre-clean known GSTINs so digits inside GST are never parsed as phones
    cleaned_text = GST_PATTERN.sub(' [GSTIN] ', text)
    cleaned_text = DATE_PATTERN.sub(' [DATE] ', cleaned_text)

    # 1. Use phonenumbers PhoneNumberMatcher
    try:
        for match in phonenumbers.PhoneNumberMatcher(cleaned_text, default_region):
            num_obj = match.number
            if phonenumbers.is_possible_number(num_obj) and phonenumbers.is_valid_number(num_obj):
                e164 = phonenumbers.format_number(num_obj, phonenumbers.PhoneNumberFormat.E164)
                if e164 not in seen_e164:
                    seen_e164.add(e164)
                    ntype = phonenumbers.number_type(num_obj)
                    type_str = 'mobile' if ntype in (PhoneNumberType.MOBILE, PhoneNumberType.FIXED_LINE_OR_MOBILE) else ('landline' if ntype == PhoneNumberType.FIXED_LINE else 'other')
                    phones.append({
                        'raw': match.raw_string.strip(),
                        'e164': e164,
                        'country': phonenumbers.region_code_for_number(num_obj) or default_region,
                        'type': type_str,
                        'source': 'ocr_matcher'
                    })
    except Exception:
        pass

    # 2. Tolerant Regex for Indian Card notations like: "M: +91 98250 12345", "Mob: 9825012345", "Ph: 0288-2550123"
    regex_candidates = re.findall(
        r'(?:mob(?:ile)?|cell|ph(?:one)?|tel|contact|m|t)[\s.:/]*([+0-9()\s-]{8,22})',
        cleaned_text,
        re.IGNORECASE
    )
    for cand in regex_candidates:
        cand_clean = cand.strip()
        if PIN_ONLY_PATTERN.match(cand_clean):
            continue
        try:
            parsed = phonenumbers.parse(cand_clean, default_region)
            if phonenumbers.is_possible_number(parsed) and phonenumbers.is_valid_number(parsed):
                e164 = phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
                if e164 not in seen_e164:
                    seen_e164.add(e164)
                    ntype = phonenumbers.number_type(parsed)
                    type_str = 'mobile' if ntype in (PhoneNumberType.MOBILE, PhoneNumberType.FIXED_LINE_OR_MOBILE) else 'landline'
                    phones.append({
                        'raw': cand_clean,
                        'e164': e164,
                        'country': phonenumbers.region_code_for_number(parsed) or default_region,
                        'type': type_str,
                        'source': 'labeled_regex'
                    })
        except Exception:
            pass

    confidence = 0.95 if phones else 0.0
    return phones, confidence

def extract_emails(text: str) -> tuple[list[str], float]:
    """Extracts valid email addresses."""
    emails = []
    seen = set()
    pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
    for m in pattern.findall(text):
        em = m.lower().strip()
        if not em.endswith(('.png', '.jpg', '.jpeg', '.webp')) and em not in seen:
            seen.add(em)
            emails.append(em)
    confidence = 0.98 if emails else 0.0
    return emails, confidence

def extract_websites(text: str) -> tuple[list[str], float]:
    """Extracts websites, filtering out email addresses."""
    websites = []
    seen = set()
    # Match www.domain.com or https://... or domain.com/pharma
    pattern = re.compile(r'\b(?:https?://)?(?:www\.)[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:/[^\s]*)?', re.IGNORECASE)
    for m in pattern.findall(text):
        url = m.strip().rstrip('.,;')
        if not url.startswith(('http://', 'https://')):
            url = f"https://{url}"
        if url not in seen:
            seen.add(url)
            websites.append(url)
    confidence = 0.95 if websites else 0.0
    return websites, confidence

def extract_designation(lines: list[str]) -> tuple[str, float]:
    """Identifies professional title or designation from keyword dictionaries."""
    for line in lines:
        upper = line.upper()
        for kw in DESIGNATION_KEYWORDS:
            if kw in upper:
                # Clean stray delimiters like " - Director"
                cleaned = re.sub(r'^[^\w]+|[^\w]+$', '', line).strip()
                return cleaned, 0.92
    return '', 0.0

def extract_company(lines: list[str], designation_line_idx: int = -1) -> tuple[str, float]:
    """Identifies organization or business name from suffixes and layout position."""
    # 1. Match company suffix keywords
    for idx, line in enumerate(lines):
        upper = line.upper()
        for kw in COMPANY_SUFFIX_KEYWORDS:
            if kw in upper:
                cleaned = re.sub(r'^[^\w]+|[^\w]+$', '', line).strip()
                return cleaned, 0.94

    # 2. Check top lines (cards usually have company name in line 0 or 1)
    if len(lines) > 0 and designation_line_idx != 0:
        first_line = lines[0].strip()
        # If it doesn't look like a phone, email, or address
        if len(first_line) > 3 and '@' not in first_line and not any(m in first_line.upper() for m in ADDRESS_MARKERS):
            return first_line, 0.70

    return '', 0.0

def extract_person_name(lines: list[str], designation_line_idx: int = -1) -> tuple[str, float]:
    """
    Extracts customer contact person name using honorific prefixes and designation line proximity.
    Actively excludes company names, addresses, emails, and URLs.
    """
    # 1. Look for honorific prefix (Mr, Dr, Shri, etc.)
    for idx, line in enumerate(lines):
        words = line.split()
        if words and words[0].upper() in HONORIFICS and len(words) >= 2:
            cleaned = re.sub(r'^[^\w.]+|[^\w.]+$', '', line).strip()
            return cleaned, 0.95

    # 2. Look immediately above or below designation line
    if designation_line_idx >= 0:
        candidates = []
        if designation_line_idx > 0:
            candidates.append(lines[designation_line_idx - 1])
        if designation_line_idx + 1 < len(lines):
            candidates.append(lines[designation_line_idx + 1])

        for cand in candidates:
            cand_clean = cand.strip()
            upper = cand_clean.upper()
            # Must not be an address, company, or email
            if not any(kw in upper for kw in COMPANY_SUFFIX_KEYWORDS) and \
               not any(kw in upper for kw in ADDRESS_MARKERS) and \
               '@' not in cand_clean and not any(char.isdigit() for char in cand_clean):
                words = cand_clean.split()
                if 2 <= len(words) <= 4:
                    return cand_clean, 0.88

    # 3. Look for 2-3 capitalized title-cased words in early lines
    for line in lines[:5]:
        line_clean = line.strip()
        upper = line_clean.upper()
        if not any(kw in upper for kw in COMPANY_SUFFIX_KEYWORDS) and \
           not any(kw in upper for kw in ADDRESS_MARKERS) and \
           '@' not in line_clean and not any(char.isdigit() for char in line_clean):
            words = line_clean.split()
            if 2 <= len(words) <= 4 and all(w[0].isupper() for w in words if w):
                return line_clean, 0.75

    return '', 0.0

def extract_address(lines: list[str]) -> tuple[str, dict, float]:
    """
    Extracts raw street address and structured components (city, state, PIN, street, country).
    Detects 6-digit Indian PIN codes and matches state/city databases.
    """
    address_lines = []
    detected_pin = ''
    detected_city = ''
    detected_state = ''

    # PIN pattern: 6 digits starting with 1-9
    pin_regex = re.compile(r'\b([1-9][0-9]{5})\b')

    for idx, line in enumerate(lines):
        line_clean = clean_ocr_line(line)
        upper = line_clean.upper()

        # Check for PIN in this line
        pin_match = pin_regex.search(line_clean)
        if pin_match:
            detected_pin = pin_match.group(1)
            address_lines.append(line_clean)
            continue

        # Check for address markers or state/city names
        has_marker = any(m in upper for m in ADDRESS_MARKERS)
        has_state = any(s.upper() in upper for s in INDIAN_STATES)
        has_city = any(c.upper() in upper for c in INDIAN_INDUSTRIAL_CITIES)

        if has_marker or has_state or has_city:
            address_lines.append(line_clean)

        # Detect specific state/city
        for s in INDIAN_STATES:
            if s.upper() in upper and not detected_state:
                detected_state = s
        for c in INDIAN_INDUSTRIAL_CITIES:
            if c.upper() in upper and not detected_city:
                detected_city = c

    if not detected_state and ('GUJARAT' in ' '.join(address_lines).upper() or detected_city in ['Ankleshwar', 'Panoli', 'Dahej', 'Vapi', 'Surat', 'Vadodara', 'Ahmedabad', 'Rajkot', 'Jamnagar']):
        detected_state = 'Gujarat'

    raw_address = ", ".join(address_lines) if address_lines else ""
    components = {
        'street': address_lines[0] if address_lines else '',
        'city': detected_city,
        'state': detected_state or ('Gujarat' if detected_pin.startswith('3') else ''),
        'postal_code': detected_pin,
        'country': 'India' if (detected_pin or detected_state or detected_city) else '',
    }

    confidence = 0.92 if detected_pin else (0.80 if raw_address else 0.0)
    return raw_address, components, confidence

def compute_overall_confidence(conf_dict: dict) -> float:
    """
    Computes weighted overall confidence score:
    Phones (35%) + Name (25%) + Address (20%) + Company (10%) + Email (10%)
    """
    weights = {
        'phones': 0.35,
        'name': 0.25,
        'address': 0.20,
        'company': 0.10,
        'emails': 0.10,
    }
    total_score = 0.0
    for key, weight in weights.items():
        score = conf_dict.get(key, 0.0)
        total_score += score * weight
    return round(total_score, 3)

def parse_card_text(ocr_text: str, base_ocr_confidence: float = 0.85) -> dict:
    """
    Main structured parser taking raw OCR text lines and returning complete structured contact model.
    """
    lines = [clean_ocr_line(l) for l in ocr_text.splitlines() if clean_ocr_line(l)]
    
    # 1. Phones
    phones, phone_conf = extract_phones(ocr_text)

    # 2. Emails & Websites
    emails, email_conf = extract_emails(ocr_text)
    websites, web_conf = extract_websites(ocr_text)

    # 3. Designation
    designation, desig_conf = extract_designation(lines)
    desig_idx = -1
    if designation:
        for i, l in enumerate(lines):
            if designation.upper() in l.upper():
                desig_idx = i
                break

    # 4. Company
    company, company_conf = extract_company(lines, designation_line_idx=desig_idx)

    # 5. Name
    name, name_conf = extract_person_name(lines, designation_line_idx=desig_idx)

    # 6. Address
    address_raw, address_components, address_conf = extract_address(lines)

    conf_dict = {
        'name': round(name_conf * base_ocr_confidence, 2),
        'phones': round(phone_conf * base_ocr_confidence, 2),
        'company': round(company_conf * base_ocr_confidence, 2),
        'emails': round(email_conf * base_ocr_confidence, 2),
        'address': round(address_conf * base_ocr_confidence, 2),
    }

    overall_conf = compute_overall_confidence(conf_dict)

    return {
        'source_type': 'OCR',
        'name': name,
        'company': company,
        'designation': designation,
        'phones': phones,
        'primary_phone': phones[0]['e164'] if phones else '',
        'emails': emails,
        'websites': websites,
        'address_raw': address_raw,
        'address_components': address_components,
        'confidence': conf_dict,
        'overall_confidence': overall_conf,
    }

