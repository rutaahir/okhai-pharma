import re
import socket
import ipaddress
import urllib.parse
import cv2
import numpy as np
from PIL import Image
import requests

try:
    import zxingcpp
except ImportError:
    zxingcpp = None

# Private & loopback IP networks for SSRF protection
BLOCKED_IP_NETWORKS = [
    ipaddress.ip_network('127.0.0.0/8'),
    ipaddress.ip_network('10.0.0.0/8'),
    ipaddress.ip_network('172.16.0.0/12'),
    ipaddress.ip_network('192.168.0.0/16'),
    ipaddress.ip_network('169.254.0.0/16'),
    ipaddress.ip_network('0.0.0.0/8'),
    ipaddress.ip_network('::1/128'),
    ipaddress.ip_network('fc00::/7'),
    ipaddress.ip_network('fe80::/10'),
]

def is_safe_public_url(url: str) -> bool:
    """Verifies that a URL resolves only to public, non-private, non-loopback IP addresses."""
    try:
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in ('http', 'https'):
            return False
        hostname = parsed.hostname
        if not hostname:
            return False
        if hostname.lower() in ('localhost', '127.0.0.1', '0.0.0.0'):
            return False

        # Resolve IP addresses
        addr_info = socket.getaddrinfo(hostname, None)
        for item in addr_info:
            ip_str = item[4][0]
            ip_obj = ipaddress.ip_address(ip_str)
            for blocked in BLOCKED_IP_NETWORKS:
                if ip_obj in blocked:
                    return False
        return True
    except Exception:
        return False

def fetch_safe_page_title(url: str) -> str:
    """Safely retrieves page title with SSRF protection and a strict 2-second timeout."""
    if not is_safe_public_url(url):
        return ''
    try:
        resp = requests.get(
            url,
            timeout=2.0,
            headers={'User-Agent': 'OkhaiPharmaLeadBot/1.0 (B2B Lead Verification)'},
            stream=True
        )
        # Read only first 32 KB
        content = resp.raw.read(32768).decode('utf-8', errors='ignore')
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if title_match:
            return title_match.group(1).strip()
    except Exception:
        pass
    return ''

def parse_vcard_payload(payload: str) -> dict:
    """Parses standard vCard 2.1, 3.0, and 4.0 formats."""
    contact = {
        'name': '',
        'company': '',
        'designation': '',
        'phones': [],
        'emails': [],
        'websites': [],
        'address_raw': '',
        'address_components': {},
        'notes': '',
    }

    lines = [line.strip() for line in payload.splitlines() if line.strip()]
    for line in lines:
        upper = line.upper()
        # Full Name
        if upper.startswith('FN:') or upper.startswith('FN;'):
            contact['name'] = line.split(':', 1)[1].strip()
        elif upper.startswith('N:') and not contact['name']:
            parts = line.split(':', 1)[1].split(';')
            clean_parts = [p.strip() for p in parts if p.strip()]
            contact['name'] = ' '.join(reversed(clean_parts))
        # Organization
        elif upper.startswith('ORG:') or upper.startswith('ORG;'):
            val = line.split(':', 1)[1].replace(';', ' - ').strip()
            contact['company'] = val
        # Title / Designation
        elif upper.startswith('TITLE:') or upper.startswith('TITLE;'):
            contact['designation'] = line.split(':', 1)[1].strip()
        # Phone numbers
        elif upper.startswith('TEL:') or upper.startswith('TEL;'):
            num = line.split(':', 1)[1].strip()
            if num:
                contact['phones'].append({'raw': num, 'source': 'vcard'})
        # Email
        elif upper.startswith('EMAIL:') or upper.startswith('EMAIL;'):
            em = line.split(':', 1)[1].strip()
            if em:
                contact['emails'].append(em)
        # URL
        elif upper.startswith('URL:') or upper.startswith('URL;'):
            u = line.split(':', 1)[1].strip()
            if u:
                contact['websites'].append(u)
        # Address
        elif upper.startswith('ADR:') or upper.startswith('ADR;'):
            parts = line.split(':', 1)[1].split(';')
            clean_parts = [p.strip() for p in parts if p.strip()]
            contact['address_raw'] = ', '.join(clean_parts)
            # vCard ADR spec: pobox;ext;street;city;state;postal_code;country
            if len(parts) >= 7:
                contact['address_components'] = {
                    'street': parts[2].strip() if len(parts) > 2 else '',
                    'city': parts[3].strip() if len(parts) > 3 else '',
                    'state': parts[4].strip() if len(parts) > 4 else '',
                    'postal_code': parts[5].strip() if len(parts) > 5 else '',
                    'country': parts[6].strip() if len(parts) > 6 else '',
                }

    return contact

def parse_mecard_payload(payload: str) -> dict:
    """Parses NTT DoCoMo MECARD format (MECARD:N:...;TEL:...;)."""
    contact = {
        'name': '',
        'company': '',
        'designation': '',
        'phones': [],
        'emails': [],
        'websites': [],
        'address_raw': '',
        'address_components': {},
    }
    content = payload[7:] if payload.startswith('MECARD:') else payload
    tokens = content.split(';')
    for token in tokens:
        token = token.strip()
        if not token or ':' not in token:
            continue
        key, val = token.split(':', 1)
        key = key.upper()
        if key == 'N':
            contact['name'] = val.replace(',', ' ').strip()
        elif key == 'TEL':
            contact['phones'].append({'raw': val.strip(), 'source': 'mecard'})
        elif key == 'EMAIL':
            contact['emails'].append(val.strip())
        elif key == 'URL':
            contact['websites'].append(val.strip())
        elif key == 'ADR':
            contact['address_raw'] = val.strip()
        elif key == 'ORG':
            contact['company'] = val.strip()
        elif key == 'TIL':
            contact['designation'] = val.strip()

    return contact

def parse_qr_payload(payload: str) -> dict:
    """Classifies and extracts structured data from any QR code payload."""
    payload = payload.strip()
    upper = payload.upper()

    res = {
        'raw_payload': payload,
        'source_type': 'QR',
        'qr_type': 'TEXT',
        'name': '',
        'company': '',
        'designation': '',
        'phones': [],
        'emails': [],
        'websites': [],
        'address_raw': '',
        'address_components': {},
        'confidence': {},
        'overall_confidence': 0.95,
    }

    if 'BEGIN:VCARD' in upper:
        res['qr_type'] = 'VCARD'
        res['source_type'] = 'VCARD'
        vcard_data = parse_vcard_payload(payload)
        res.update(vcard_data)
        res['overall_confidence'] = 0.98
        res['confidence'] = {k: 0.98 for k in ['name', 'company', 'phones', 'address'] if res.get(k)}

    elif upper.startswith('MECARD:'):
        res['qr_type'] = 'MECARD'
        res['source_type'] = 'VCARD'
        mecard_data = parse_mecard_payload(payload)
        res.update(mecard_data)
        res['overall_confidence'] = 0.96
        res['confidence'] = {k: 0.96 for k in ['name', 'company', 'phones', 'address'] if res.get(k)}

    elif upper.startswith('TEL:'):
        res['qr_type'] = 'TEL'
        num = payload[4:].strip()
        res['phones'] = [{'raw': num, 'source': 'qr_tel'}]
        res['confidence']['phones'] = 0.99

    elif upper.startswith('MAILTO:'):
        res['qr_type'] = 'MAILTO'
        em = payload[7:].split('?')[0].strip()
        res['emails'] = [em]
        res['confidence']['emails'] = 0.99

    elif upper.startswith('HTTP://') or upper.startswith('HTTPS://'):
        res['qr_type'] = 'URL'
        res['websites'] = [payload]
        # Check WhatsApp link
        if 'wa.me/' in payload or 'api.whatsapp.com/send' in payload:
            wa_num_match = re.search(r'phone=([0-9+]+)', payload) or re.search(r'wa\.me/([0-9+]+)', payload)
            if wa_num_match:
                res['phones'].append({'raw': wa_num_match.group(1), 'source': 'whatsapp_qr'})
        else:
            title = fetch_safe_page_title(payload)
            if title:
                res['company'] = title[:100]

    return res

def detect_qr_codes(pil_image: Image.Image) -> list[dict]:
    """Detects and parses QR codes using OpenCV and zxingcpp across multiple scales and rotations."""
    results = []
    seen_payloads = set()

    cv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    gray = cv2.cvtColor(cv_image, cv2.COLOR_BGR2GRAY)

    detector = cv2.QRCodeDetector()

    # Preprocessed variations
    variants = [
        ("original_gray", gray),
        ("clahe", cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8)).apply(gray)),
        ("otsu", cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]),
        ("upscaled", cv2.resize(gray, (0, 0), fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)),
    ]

    # Rotations
    rotated_variants = []
    for name, v_img in variants[:2]:
        rotated_variants.append((f"{name}_rot90", cv2.rotate(v_img, cv2.ROTATE_90_CLOCKWISE)))
        rotated_variants.append((f"{name}_rot180", cv2.rotate(v_img, cv2.ROTATE_180)))
        rotated_variants.append((f"{name}_rot270", cv2.rotate(v_img, cv2.ROTATE_90_COUNTERCLOCKWISE)))
    variants.extend(rotated_variants)

    # 1. OpenCV Multi-detector
    for name, v_img in variants:
        try:
            # detectAndDecodeMulti or detectAndDecode
            ok, decoded_info, points, _ = detector.detectAndDecodeMulti(v_img)
            if ok and decoded_info:
                for text in decoded_info:
                    if text and text not in seen_payloads:
                        seen_payloads.add(text)
                        results.append(parse_qr_payload(text))
            elif not ok:
                text, points, _ = detector.detectAndDecode(v_img)
                if text and text not in seen_payloads:
                    seen_payloads.add(text)
                    results.append(parse_qr_payload(text))
        except Exception:
            pass

    # 2. ZXing fallback if available
    if zxingcpp:
        for name, v_img in variants:
            try:
                barcodes = zxingcpp.read_barcodes(v_img)
                for b in barcodes:
                    text = b.text
                    if text and text not in seen_payloads:
                        seen_payloads.add(text)
                        results.append(parse_qr_payload(text))
            except Exception:
                pass

    return results

