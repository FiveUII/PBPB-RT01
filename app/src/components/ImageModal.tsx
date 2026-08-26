"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageModal({ 
  children, 
  images, 
  initialIndex = 0 
}: { 
  children: React.ReactNode, 
  images: string[], 
  initialIndex?: number 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      style={{ margin: 0, padding: 0 }}
    >
      <button 
        className="absolute top-6 right-6 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all z-50"
        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
      >
        <X size={28} />
      </button>
      
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-12 min-h-0" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button 
            className="absolute left-4 md:left-8 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all z-10"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
          >
            <ChevronLeft size={36} />
          </button>
        )}
        
        <img 
          src={images[currentIndex]} 
          alt={`Preview ${currentIndex}`} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none animate-in zoom-in-95 duration-200" 
        />

        {images.length > 1 && (
          <button 
            className="absolute right-4 md:right-8 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all z-10"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
          >
            <ChevronRight size={36} />
          </button>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      <div onClick={() => { setCurrentIndex(initialIndex); setIsOpen(true); }} className="cursor-pointer w-full h-full">
        {children}
      </div>

      {mounted && typeof document !== 'undefined' && modalContent 
        ? createPortal(modalContent, document.body) 
        : null}
    </>
  );
}
