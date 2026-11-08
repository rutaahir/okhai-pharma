# Troubleshooting Guide: Lead Module Card Extraction Engine

## 1. Environment & API Configuration

The extraction pipeline uses **Gemini 3.1 Flash-Lite** as the primary vision reader, with parallel local **RapidOCR (PaddleOCR-ONNX)** cross-checking, automatic quadrilateral perspective rectification, and strict Pydantic + `phonenumbers` validation.

### Required Environment Variables (`.env`)
```bash
# Google Gemini Multimodal Vision API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Lead Passcode Secret & Expiry
JWT_SECRET=your_jwt_secret_key
LEAD_TOKEN_EXPIRY_SECONDS=86400  # 24 hours
```

---

## 2. Verifying OCR Engines and Dependencies

Verify that all required image processing and OCR packages are functional in your Python environment:

```bash
# 1. Test RapidOCR (PaddleOCR ONNX runtime)
python -c "from rapidocr_onnxruntime import RapidOCR; ocr = RapidOCR(); print('RapidOCR initialized successfully')"

# 2. Test Pillow HEIF and ImageOps
python -c "import pillow_heif, PIL; print('Pillow and HEIF support loaded')"

# 3. Test Barcode & QR Code Reader (zxingcpp)
python -c "import zxingcpp; print('zxingcpp loaded')"

# 4. Test Pydantic & Phone Validator
python -c "import pydantic, phonenumbers; print('Validation libraries active')"

# 5. Test Gemini Vision API Connectivity
python -c "
import os, django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'okhai_backend.settings')
django.setup()
from leads.pipeline.vision_extractor import VisionExtractor
v = VisionExtractor()
print('VisionExtractor ready, API Key configured:', bool(v.api_key))
"
```

---

## 3. Truthful Job States & Lead Status Mapping

The system strictly avoids placeholder strings (e.g. `"Direct Commercial Contact"`, `"Not Specified"`, `"Gujarat, India"`). Missing fields return `null` and display as muted `"Not detected"`.

| Job Status | Lead Status | Trigger Condition | UI Presentation |
| :--- | :--- | :--- | :--- |
| `QUEUED` / `PENDING` | `NEW` | File uploaded, awaiting background worker | Animated spinner: "Enqueued for AI analysis" |
| `RUNNING` / `PROCESSING` | `PROCESSING` | Pipeline executing (card detection, OCR, Vision LLM) | Progress bar 10%–95%, showing real sub-steps |
| `SUCCEEDED` | `VERIFIED` | Name + (Phone or Email) extracted with confidence ≥ 0.80 | Green badge: "Extraction Complete" + verified preview |
| `PARTIAL` | `NEEDS_REVIEW` | Some fields read, but missing key identity or conf < 0.80 | Amber badge: "Partial Extraction Completed" + inline edits |
| `FAILED` | `FAILED` | Unreadable, blurry, dark, or blank image | Amber/Red alert: "Could not read this image clearly" + Retake Photo button |

---

## 4. Reading Logs & Debugging Failures

### Inspecting a Lead from Django Shell:
```bash
python manage.py shell
```
```python
from leads.models import Lead, LeadFile, ExtractedContact

lead = Lead.objects.get(reference_code="LD-2026-000001")
print("Status:", lead.status)
print("Job Step:", lead.job.current_step, "| Status:", lead.job.status)

for f in lead.files.all():
    print(f"File: {f.original_filename} | Status: {f.processing_status} | Engine: {f.ocr_engine}")
    if f.error_message:
        print("  Error:", f.error_code, "-", f.error_message)

for c in lead.contacts.all():
    print(f"Contact: {c.name} ({c.company}) | Phone: {c.primary_phone} | Conf: {c.overall_confidence}")
    print("  Confidence Breakdown:", c.confidence)
```

### Reprocessing a Lead:
To re-run the extraction pipeline on any existing lead:
```python
from leads.pipeline.task_runner import execute_lead_pipeline_task
execute_lead_pipeline_task("YOUR_LEAD_UUID", is_reprocess=True)
```

