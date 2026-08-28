"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ProfilGalleryClient({ galeriUrls }: { galeriUrls: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!galeriUrls || galeriUrls.length === 0) return null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galeriUrls.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galeriUrls.length) % galeriUrls.length);
    }
  };

  return (
    <section className="fade-up fade-up-delay-1">
      <h2 className="section-title mb-3 px-1">Galeri</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x hide-scrollbar">
        {galeriUrls.map((url: string, idx: number) => (
          <img 
            key={idx} 
            src={url} 
            alt={`Galeri ${idx + 1}`} 
            onClick={() => setLightboxIndex(idx)}
            className="w-40 h-40 rounded-lg object-cover flex-shrink-0 snap-center shadow-sm border border-gray-100 cursor-pointer hover:opacity-90 transition-opacity" 
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[60] bg-black/90 flex flex-col backdrop-blur-sm"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm font-medium">
              {lightboxIndex + 1} / {galeriUrls.length}
            </span>
            <button 
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <img 
              src={galeriUrls[lightboxIndex]} 
              alt={`Galeri ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing
            />
          </div>

          {/* Navigation Controls */}
          {galeriUrls.length > 1 && (
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
              <button 
                className="p-3 rounded-full bg-black/50 text-white pointer-events-auto hover:bg-black/70 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                className="p-3 rounded-full bg-black/50 text-white pointer-events-auto hover:bg-black/70 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
