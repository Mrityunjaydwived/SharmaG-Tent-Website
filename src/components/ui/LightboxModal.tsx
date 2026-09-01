import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev && onPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-8 animate-fadeIn">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
        aria-label="Close image viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {hasPrev && onPrev && (
        <button
          onClick={onPrev}
          className="absolute left-4 z-50 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
      )}

      {/* Next button */}
      {hasNext && onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 z-50 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition"
          aria-label="Next image"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      )}

      {/* Main Content */}
      <div className="max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl max-h-[75vh]">
          <img
            src={item.image_url}
            alt={item.title}
            className="w-full h-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="mt-4 text-center max-w-2xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {item.category}
          </div>
          <h3 className="text-xl font-bold text-[#FAF8F5] font-serif-luxury">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-gray-300 mt-1">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
