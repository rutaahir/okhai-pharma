import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  Camera,
  FileText,
  Image as ImageIcon,
  X,
  FileCheck2,
  AlertCircle,
  Copy,
  Sparkles
} from 'lucide-react';

interface FileUploadZoneProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const ACCEPTED_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
  'image/tiff', 'image/bmp', 'image/gif', 'application/pdf'
];

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  files,
  onFilesChange,
  maxFiles = 10,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previews, setPreviews] = useState<{ [key: string]: string }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Generate image object URLs for thumbnails
  useEffect(() => {
    const newPreviews: { [key: string]: string } = {};
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        newPreviews[file.name] = URL.createObjectURL(file);
      }
    });
    setPreviews(newPreviews);

    return () => {
      Object.values(newPreviews).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  // Global paste handler to catch clipboard business card screenshots
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            const renamed = new File([file], `clipboard_card_${Date.now()}.png`, { type: file.type });
            pastedFiles.push(renamed);
          }
        }
      }

      if (pastedFiles.length > 0) {
        addFiles(pastedFiles);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [files]);

  // Client-side image compression for large camera photos (> 2MB)
  const compressImageIfNeeded = async (file: File): Promise<File> => {
    if (!file.type.startsWith('image/') || file.size <= 2 * 1024 * 1024) {
      return file;
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Max dimension 2400px (crystal sharp for 300 DPI OCR)
          const maxDim = 2400;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob && blob.size < file.size) {
                  const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(compressedFile);
                } else {
                  resolve(file);
                }
              },
              'image/jpeg',
              0.88
            );
          } else {
            resolve(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const addFiles = async (newFiles: File[]) => {
    setErrorMessage('');
    const validFiles: File[] = [];

    for (const f of newFiles) {
      // Size check
      if (f.size > MAX_FILE_SIZE_BYTES) {
        setErrorMessage(`File "${f.name}" exceeds the 15 MB limit.`);
        continue;
      }

      // Check max files
      if (files.length + validFiles.length >= maxFiles) {
        setErrorMessage(`Maximum limit of ${maxFiles} files reached.`);
        break;
      }

      // Compression check
      const processedFile = await compressImageIfNeeded(f);
      validFiles.push(processedFile);
    }

    if (validFiles.length > 0) {
      onFilesChange([...files, ...validFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemove = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    onFilesChange(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Drag & Drop Main Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-[#5B9A3C] bg-[#F4F9F1] scale-[1.01] shadow-lg shadow-[#5B9A3C]/10'
            : 'border-[#1E3D2A]/15 bg-white/70 hover:bg-white hover:border-[#5B9A3C]/60 hover:shadow-md'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,application/pdf,.heic,.heif,.tiff,.bmp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(Array.from(e.target.files));
            }
          }}
        />

        {/* Hidden Camera Input for Mobile Take Photo */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              addFiles(Array.from(e.target.files));
            }
          }}
        />

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#E6EEDF]/80 text-[#5B9A3C] flex items-center justify-center shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-base font-serif font-bold text-[#1E3D2A]">
              Drop business cards, brochures, or flyers here
            </h3>
            <p className="text-xs text-[#1E3D2A]/65 mt-1">
              or <span className="text-[#5B9A3C] font-semibold underline underline-offset-2">browse files</span> from your computer
            </p>
          </div>

          {/* Quick Actions (Camera on Mobile & Clipboard hint) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1E3D2A]/5 hover:bg-[#1E3D2A]/10 text-[#1E3D2A] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span>Take Card Photo</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1E3D2A]/5 text-[#1E3D2A]/70 text-xs">
              <Copy className="w-3.5 h-3.5 text-[#5B9A3C]" />
              <span>Paste from clipboard (Ctrl+V)</span>
            </span>
          </div>

          <div className="text-[11px] font-mono text-[#1E3D2A]/50 mt-1">
            JPG, PNG, WEBP, PDF, HEIC, TIFF · Up to 15 MB per file · Max {maxFiles} files
          </div>
        </div>
      </div>

      {/* Validation Error */}
      {errorMessage && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Selected Files Thumbnail Grid */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#1E3D2A]/75 px-1">
            <span>Uploaded Documents &amp; Cards ({files.length}/{maxFiles})</span>
            <span className="text-[11px] text-[#5B9A3C]">Ready for OCR Extraction</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {files.map((file, idx) => {
              const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
              const previewUrl = previews[file.name];

              return (
                <div
                  key={`${file.name}-${idx}`}
                  className="relative p-2.5 rounded-2xl bg-white border border-[#1E3D2A]/10 shadow-xs flex items-center gap-3 group hover:border-[#5B9A3C]/50 transition-all"
                >
                  {/* Thumbnail / Icon */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#F8F9F4] border border-[#1E3D2A]/10 flex items-center justify-center shrink-0">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : isPdf ? (
                      <FileText className="w-6 h-6 text-red-600" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-[#5B9A3C]" />
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-[#1E3D2A] truncate" title={file.name}>
                      {file.name}
                    </h5>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono text-[#1E3D2A]/60">
                      <span>{formatFileSize(file.size)}</span>
                      <span>·</span>
                      <span className="uppercase text-[#5B9A3C] font-semibold">{isPdf ? 'PDF' : 'IMAGE'}</span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="p-1.5 rounded-lg text-[#1E3D2A]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

