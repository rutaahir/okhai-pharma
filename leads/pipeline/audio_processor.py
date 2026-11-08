import os
import shutil
import subprocess
import base64
from pathlib import Path
import mutagen
from mutagen.mp3 import MP3
from mutagen.wave import WAVE
import requests
from django.conf import settings
from .parser import parse_card_text

try:
    from faster_whisper import WhisperModel
    whisper_available = True
except ImportError:
    whisper_available = False

def get_audio_duration_seconds(file_path: str) -> float:
    """Reads audio file duration in seconds using mutagen with safe fallbacks."""
    try:
        audio = mutagen.File(file_path)
        if audio and audio.info and getattr(audio.info, 'length', None):
            return round(float(audio.info.length), 2)
    except Exception:
        pass

    # Try wave module if wav
    if file_path.lower().endswith('.wav'):
        try:
            import wave
            with wave.open(file_path, 'rb') as wf:
                frames = wf.getnframes()
                rate = wf.getframerate()
                if rate > 0:
                    return round(frames / float(rate), 2)
        except Exception:
            pass

    return 0.0

def normalize_audio_with_ffmpeg(input_path: str, output_path: str) -> bool:
    """Normalizes audio via ffmpeg if installed on the host system."""
    ffmpeg_bin = shutil.which('ffmpeg')
    if not ffmpeg_bin:
        return False
    try:
        cmd = [
            ffmpeg_bin, '-y',
            '-i', input_path,
            '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
            '-ar', '16000',
            '-ac', '1',
            output_path
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=30)
        return os.path.exists(output_path) and os.path.getsize(output_path) > 0
    except Exception:
        return False

def transcribe_with_whisper(audio_path: str) -> tuple[str, str] | None:
    """Local offline transcription using faster-whisper."""
    if not whisper_available:
        return None
    try:
        model = WhisperModel("tiny", device="cpu", compute_type="int8")
        segments, info = model.transcribe(audio_path, beam_size=5)
        text = " ".join([segment.text for segment in segments]).strip()
        lang = getattr(info, 'language', 'en')
        return text, lang
    except Exception:
        return None

def transcribe_with_gemini_audio(audio_path: str, api_key: str) -> tuple[str, str] | None:
    """Cloud fallback audio transcription using Gemini Flash Multimodal."""
    try:
        with open(audio_path, 'rb') as f:
            audio_bytes = f.read()
        audio_b64 = base64.b64encode(audio_bytes).decode('utf-8')
        ext = os.path.splitext(audio_path)[1].lower().replace('.', '')
        mime = f'audio/{ext}' if ext in ['mp3', 'wav', 'ogg', 'webm', 'm4a'] else 'audio/webm'

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": "Transcribe this audio recording accurately verbatim in its spoken language (English, Hindi, or Gujarati). Provide only the transcript text."},
                        {
                            "inline_data": {
                                "mime_type": mime,
                                "data": audio_b64
                            }
                        }
                    ]
                }
            ]
        }
        resp = requests.post(url, json=payload, timeout=20.0)
        if resp.status_code == 200:
            data = resp.json()
            candidates = data.get('candidates', [])
            if candidates:
                transcript = candidates[0]['content']['parts'][0]['text'].strip()
                return transcript, 'auto'
    except Exception:
        pass
    return None

def process_voice_note(file_path: str) -> dict:
    """
    Complete Voice Note Processing:
    1. Read duration
    2. Check ffmpeg normalization
    3. Transcribe (faster-whisper -> Gemini fallback -> skip)
    4. Run NLP parser on transcript to extract contact details
    """
    duration = get_audio_duration_seconds(file_path)

    # Transcription attempts
    transcript = ""
    lang = ""
    status = "SKIPPED"

    # 1. Faster whisper (local)
    whisper_res = transcribe_with_whisper(file_path)
    if whisper_res:
        transcript, lang = whisper_res
        status = "DONE"
    else:
        # 2. Gemini fallback
        gemini_key = getattr(settings, 'GEMINI_API_KEY', '') or os.getenv('GEMINI_API_KEY', '')
        if gemini_key:
            gem_res = transcribe_with_gemini_audio(file_path, gemini_key)
            if gem_res:
                transcript, lang = gem_res
                status = "DONE"

    # If transcript was generated, parse for contact mentions
    extracted_from_transcript = None
    if transcript:
        extracted_from_transcript = parse_card_text(transcript, base_ocr_confidence=0.80)
        extracted_from_transcript['source_type'] = 'VOICE'

    return {
        'duration_seconds': duration,
        'transcript': transcript if transcript else None,
        'transcript_language': lang,
        'transcription_status': status,
        'extracted_contact': extracted_from_transcript,
    }

