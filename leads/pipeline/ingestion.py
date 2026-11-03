import hashlib
import os
import io
import puremagic
from PIL import Image, ImageOps
import pymupdf  # PyMuPDF (fitz)

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass

MAX_IMAGE_PDF_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB
MAX_AUDIO_SIZE_BYTES = 25 * 1024 * 1024      # 25 MB
MAX_FILES_COUNT = 10
MAX_VOICE_NOTES_COUNT = 10

EXECUTABLE_SIGNATURES = [
    b'MZ',          # Windows PE
    b'\x7fELF',     # Linux ELF
    b'#!/',         # Unix shell script
    b'<!DOCTYPE',   # HTML/script injection in image container
    b'<script',
]

SUPPORTED_IMAGE_MIMES = {
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'image/tiff', 'image/bmp', 'image/gif', 'image/heic', 'image/heif'
}

SUPPORTED_PDF_MIMES = {'application/pdf', 'application/x-pdf'}

SUPPORTED_AUDIO_MIMES = {
    'audio/webm', 'audio/wav', 'audio/wave', 'audio/x-wav',
    'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/m4a', 'audio/x-m4a', 'audio/mp4'
}

class IngestionValidationError(Exception):
    pass

def compute_sha256(file_obj_or_bytes) -> str:
    h = hashlib.sha256()
    if isinstance(file_obj_or_bytes, bytes):
        h.update(file_obj_or_bytes)
    else:
        file_obj_or_bytes.seek(0)
        while chunk := file_obj_or_bytes.read(65536):
            h.update(chunk)
        file_obj_or_bytes.seek(0)
    return h.hexdigest()

def validate_magic_bytes(file_bytes: bytes, filename: str) -> str:
    """Verifies file header bytes against executable blacklists and detects true MIME."""
    # 1. Executable blacklist
    for sig in EXECUTABLE_SIGNATURES:
        if file_bytes.startswith(sig):
            raise IngestionValidationError(f"Forbidden executable or script file detected: {filename}")

    # 2. Inspect with puremagic
    try:
        matches = puremagic.magic_string(file_bytes)
        if matches:
            detected_mime = matches[0].mime_type
        else:
            detected_mime = 'application/octet-stream'
    except Exception:
        detected_mime = 'application/octet-stream'

    # Fallback to extension check if puremagic was ambiguous
    ext = os.path.splitext(filename)[1].lower()
    if detected_mime == 'application/octet-stream':
        if ext in ['.jpg', '.jpeg']:
            detected_mime = 'image/jpeg'
        elif ext == '.png':
            detected_mime = 'image/png'
        elif ext == '.webp':
            detected_mime = 'image/webp'
        elif ext in ['.heic', '.heif']:
            detected_mime = 'image/heic'
        elif ext == '.pdf':
            detected_mime = 'application/pdf'
        elif ext in ['.webm', '.mp3', '.wav', '.ogg', '.m4a']:
            detected_mime = f'audio/{ext[1:]}'

    return detected_mime

def normalize_image(file_bytes: bytes) -> Image.Image:
    """Loads image, fixes EXIF orientation, strips sensitive EXIF metadata, converts to RGB."""
    img = Image.open(io.BytesIO(file_bytes))
    
    # Fix orientation
    try:
        img = ImageOps.exif_transpose(img)
    except Exception:
        pass

    # Convert to RGB (removes alpha if PNG/WEBP, handles CMYK, palette mode)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Return pure clean PIL Image with stripped metadata
    clean_img = Image.new('RGB', img.size)
    clean_img.paste(img)
    return clean_img

def rasterize_pdf_pages(file_bytes: bytes, dpi: int = 300) -> list[tuple[Image.Image, str]]:
    """Rasterizes PDF pages to high-resolution 300 DPI PIL Images. Also returns native text if present."""
    doc = pymupdf.open(stream=file_bytes, filetype="pdf")
    pages_output = []
    
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        native_text = page.get_text() or ''
        pix = page.get_pixmap(dpi=dpi)
        img = Image.open(io.BytesIO(pix.tobytes("png"))).convert('RGB')
        pages_output.append((img, native_text))
        
    doc.close()
    return pages_output

