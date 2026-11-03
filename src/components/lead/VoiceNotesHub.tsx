import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Edit2,
  Check,
  AlertTriangle,
  Upload,
  Volume2,
  RotateCcw,
  AudioWaveform
} from 'lucide-react';

export interface VoiceNoteDraft {
  id: string;
  blob: Blob;
  name: string;
  durationSeconds: number;
  url: string;
}

interface VoiceNotesHubProps {
  voiceNotes: VoiceNoteDraft[];
  onVoiceNotesChange: (notes: VoiceNoteDraft[]) => void;
  maxNotes?: number;
}

export const VoiceNotesHub: React.FC<VoiceNotesHubProps> = ({
  voiceNotes,
  onVoiceNotesChange,
  maxNotes = 10,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [activePlayId, setActivePlayId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Detect supported mimeType (crucial for iOS Safari vs Chrome vs Firefox)
  const getSupportedMimeType = () => {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/aac',
      'audio/ogg;codecs=opus',
      'audio/ogg',
    ];
    for (const t of types) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) {
        return t;
      }
    }
    return '';
  };

  // Live waveform drawer
  const drawWaveform = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 3;
    const gap = 2;
    const barCount = Math.floor(canvas.width / (barWidth + gap));
    const step = Math.floor(bufferLength / barCount);

    for (let i = 0; i < barCount; i++) {
      const val = dataArray[i * step] || 0;
      const barHeight = Math.max(3, (val / 255) * canvas.height);
      const x = i * (barWidth + gap);
      const y = (canvas.height - barHeight) / 2;

      ctx.fillStyle = isPaused ? '#A0AEC0' : '#5B9A3C';
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 2);
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(drawWaveform);
  };

  // Start in-browser recording
  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    setRecordDuration(0);

    if (voiceNotes.length >= maxNotes) {
      setMicError(`Maximum limit of ${maxNotes} voice notes reached.`);
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('In-browser audio recording is not supported in this browser. Please upload audio files.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup audio analyzer
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mimeType = getSupportedMimeType();
      const options = mimeType ? { mimeType } : undefined;
      const recorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const finalBlob = new Blob(audioChunksRef.current, {
          type: mimeType || 'audio/webm',
        });
        const url = URL.createObjectURL(finalBlob);
        const newNote: VoiceNoteDraft = {
          id: `voice_${Date.now()}`,
          blob: finalBlob,
          name: `Voice Briefing #${voiceNotes.length + 1}`,
          durationSeconds: recordDuration,
          url,
        };
        onVoiceNotesChange([...voiceNotes, newNote]);

        // Cleanup audio graph
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      };

      recorder.start(250); // Emit chunk every 250ms
      setIsRecording(true);
      setIsPaused(false);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordDuration((prev) => prev + 1);
      }, 1000);

      // Start drawing waveform
      drawWaveform();
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setMicError('Microphone permission was denied. Please allow microphone access in your browser or upload an audio file below.');
      } else {
        setMicError(err.message || 'Could not access microphone.');
      }
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        timerRef.current = setInterval(() => {
          setRecordDuration((prev) => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const cancelRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      // Discard by removing onstop listener before stopping
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      setIsRecording(false);
      setIsPaused(false);
      setRecordDuration(0);
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    }
  };

  // Upload file fallback
  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > 25 * 1024 * 1024) {
      setMicError('Audio file exceeds the 25 MB limit.');
      return;
    }

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.onloadedmetadata = () => {
      const dur = Math.round(audio.duration) || 0;
      const newNote: VoiceNoteDraft = {
        id: `voice_up_${Date.now()}`,
        blob: file,
        name: file.name.replace(/\.[^.]+$/, ''),
        durationSeconds: dur,
        url,
      };
      onVoiceNotesChange([...voiceNotes, newNote]);
    };
  };

  const handleDelete = (id: string) => {
    const updated = voiceNotes.filter((n) => n.id !== id);
    onVoiceNotesChange(updated);
  };

  const handleSaveRename = (id: string) => {
    if (!editName.trim()) return;
    const updated = voiceNotes.map((n) => (n.id === id ? { ...n, name: editName.trim() } : n));
    onVoiceNotesChange(updated);
    setEditingId(null);
  };

  const togglePlay = (id: string) => {
    const audio = audioElementsRef.current[id];
    if (!audio) return;

    if (activePlayId === id) {
      audio.pause();
      setActivePlayId(null);
    } else {
      // Pause any currently playing
      if (activePlayId && audioElementsRef.current[activePlayId]) {
        audioElementsRef.current[activePlayId].pause();
      }
      audio.play();
      setActivePlayId(id);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-serif font-bold text-[#1E3D2A] flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#5B9A3C]" />
            <span>Voice Briefings &amp; Audio Notes</span>
          </h4>
          <p className="text-xs text-[#1E3D2A]/60 mt-0.5">
            Record spoken requirements or upload voice memos ({voiceNotes.length}/{maxNotes})
          </p>
        </div>

        {/* Upload Audio Fallback Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={voiceNotes.length >= maxNotes || isRecording}
          className="text-xs font-semibold text-[#5B9A3C] hover:text-[#1E3D2A] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Audio</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleAudioFileUpload}
        />
      </div>

      {/* Mic Error Banner */}
      {micError && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{micError}</span>
          </div>
        </div>
      )}

      {/* Live Recording Console */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs">
        {isRecording ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Waveform & Duration */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-ping shrink-0" />
              <div className="font-mono text-base font-bold text-[#1E3D2A] tracking-wider w-16">
                {formatSeconds(recordDuration)}
              </div>
              <canvas
                ref={canvasRef}
                width={200}
                height={36}
                className="w-full sm:w-[200px] h-9 bg-[#F8F9F4] rounded-xl px-2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={pauseRecording}
                className="px-3 py-1.5 rounded-xl border border-[#1E3D2A]/15 text-xs font-semibold text-[#1E3D2A] hover:bg-black/5 flex items-center gap-1.5 cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-[#5B9A3C]" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                onClick={cancelRecording}
                className="px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-1.5 cursor-pointer"
                title="Discard recording"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Discard</span>
              </button>

              <button
                type="button"
                onClick={stopRecording}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Save Voice Note</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E6EEDF]/80 text-[#5B9A3C] flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-[#1E3D2A]">
                  Speak directly into your microphone
                </h5>
                <p className="text-[11px] text-[#1E3D2A]/60">
                  AI will transcribe contact details, delivery addresses, and chemical specifications.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={startRecording}
              disabled={voiceNotes.length >= maxNotes}
              className="px-4 py-2.5 rounded-xl bg-[#5B9A3C] hover:bg-[#4e8532] text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Mic className="w-4 h-4" />
              <span>Record Voice Note</span>
            </button>
          </div>
        )}
      </div>

      {/* Voice Notes List */}
      {voiceNotes.length > 0 && (
        <div className="space-y-2 pt-1">
          {voiceNotes.map((note) => {
            const isPlaying = activePlayId === note.id;

            return (
              <div
                key={note.id}
                className="p-3 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                {/* Audio Player and Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Play Button */}
                  <button
                    type="button"
                    onClick={() => togglePlay(note.id)}
                    className="w-9 h-9 rounded-xl bg-[#F4F9F1] border border-[#5B9A3C]/30 text-[#5B9A3C] hover:bg-[#5B9A3C] hover:text-white transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <audio
                    ref={(el) => {
                      if (el) audioElementsRef.current[note.id] = el;
                    }}
                    src={note.url}
                    onEnded={() => setActivePlayId(null)}
                    className="hidden"
                  />

                  {/* Title or inline edit */}
                  <div className="flex-1 min-w-0">
                    {editingId === note.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="px-2 py-0.5 rounded border border-[#5B9A3C] text-xs font-semibold text-[#1E3D2A] focus:outline-none"
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveRename(note.id)}
                          className="p-1 text-green-700 hover:bg-green-50 rounded"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#1E3D2A] truncate">
                          {note.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(note.id);
                            setEditName(note.name);
                          }}
                          className="text-[#1E3D2A]/40 hover:text-[#5B9A3C] transition-colors p-0.5"
                          title="Rename note"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#1E3D2A]/50 mt-0.5">
                      <span>{formatSeconds(note.durationSeconds)}</span>
                      <span>·</span>
                      <span className="text-[#5B9A3C]">Auto-transcription enqueued</span>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  className="self-end sm:self-center p-1.5 rounded-lg text-[#1E3D2A]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete voice note"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

