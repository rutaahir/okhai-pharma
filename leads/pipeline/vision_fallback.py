import os
import io
import json
import base64
from PIL import Image
import requests
from django.conf import settings

VISION_JSON_SCHEMA_PROMPT = """
You are an expert OCR and document understanding specialist for pharmaceutical and industrial B2B business cards and brochures.
Analyze the attached image and extract all contact details into a STRICT JSON object matching this schema:
{
  "name": "Full name of the contact person or empty string",
  "company": "Company or business name or empty string",
  "designation": "Designation or title (e.g. Director, Manager) or empty string",
  "phones": ["+91... list of phone numbers with country code if discernable"],
  "emails": ["list of email addresses"],
  "websites": ["list of website URLs"],
  "address_raw": "Full street address with PIN code and city",
  "address_components": {
    "street": "Street name or GIDC estate",
    "city": "City name",
    "state": "State name (e.g. Gujarat)",
    "postal_code": "6-digit PIN code or postal code",
    "country": "India or country name"
  },
  "notes": "Any other relevant commercial details"
}
Output ONLY valid JSON. No markdown ticks, no preamble.
"""

def call_gemini_vision(pil_image: Image.Image, api_key: str) -> dict | None:
    """Invokes Gemini 2.5 Flash / Flash-Lite Vision API for high-precision business card extraction."""
    try:
        buffered = io.BytesIO()
        pil_image.save(buffered, format="JPEG", quality=85)
        img_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": VISION_JSON_SCHEMA_PROMPT},
                        {
                            "inline_data": {
                                "mime_type": "image/jpeg",
                                "data": img_b64
                            }
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.1,
                "response_mime_type": "application/json"
            }
        }

        resp = requests.post(url, json=payload, timeout=12.0)
        if resp.status_code == 200:
            data = resp.json()
            candidates = data.get('candidates', [])
            if candidates:
                text_part = candidates[0]['content']['parts'][0]['text']
                parsed = json.loads(text_part)
                return parsed
    except Exception as e:
        # Graceful fallback, never crash offline
        pass
    return None

def call_anthropic_vision(pil_image: Image.Image, api_key: str) -> dict | None:
    """Invokes Claude 3.5 Sonnet / Haiku Vision API if ANTHROPIC_API_KEY is configured."""
    try:
        buffered = io.BytesIO()
        pil_image.save(buffered, format="JPEG", quality=85)
        img_b64 = base64.b64encode(buffered.getvalue()).decode('utf-8')

        url = "https://api.anthropic.com/v1/messages"
        headers = {
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        payload = {
            "model": "claude-3-5-haiku-latest",
            "max_tokens": 1024,
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": img_b64
                            }
                        },
                        {"type": "text", "text": VISION_JSON_SCHEMA_PROMPT}
                    ]
                }
            ]
        }
        resp = requests.post(url, headers=headers, json=payload, timeout=15.0)
        if resp.status_code == 200:
            data = resp.json()
            raw_text = data['content'][0]['text']
            # Clean possible markdown wrapping
            if '```json' in raw_text:
                raw_text = raw_text.split('```json')[1].split('```')[0]
            elif '```' in raw_text:
                raw_text = raw_text.split('```')[1].split('```')[0]
            return json.loads(raw_text.strip())
    except Exception:
        pass
    return None

def run_vision_llm_fallback(pil_image: Image.Image) -> dict | None:
    """Checks for configured keys and attempts vision LLM extraction."""
    # Check Gemini API Key
    gemini_key = getattr(settings, 'GEMINI_API_KEY', '') or os.getenv('GEMINI_API_KEY', '')
    if gemini_key:
        res = call_gemini_vision(pil_image, gemini_key)
        if res:
            return res

    # Check Anthropic API Key
    anthropic_key = getattr(settings, 'ANTHROPIC_API_KEY', '') or os.getenv('ANTHROPIC_API_KEY', '')
    if anthropic_key:
        res = call_anthropic_vision(pil_image, anthropic_key)
        if res:
            return res

    return None

