"use client";

import { useState } from "react";
import { X, Calendar } from "lucide-react";

export default function KegiatanClient({ kegiatan }: { kegiatan: any[] }) {
  const [selectedKegiatan, setSelectedKegiatan] = useState<any | null>(null);
  const [lightboxData, setLightboxData] = useState<{ urls: string[], index: number } | null>(null);

  // Close modals when clicking outside
  const handleLightboxClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setLightboxData(null);
    }
  };

  const openLightbox = (item: any, clickedUrl: string) => {
    const urls = [];
    if (item.foto_url) urls.push(item.foto_url);
    if (item.galeri_urls && item.galeri_urls.length > 0) {
      urls.push(...item.galeri_urls);
    }
    const index = urls.indexOf(clickedUrl);
    setLightboxData({ urls, index: index !== -1 ? index : 0 });
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedKegiatan(null);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kegiatan.length === 0 ? (
          <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
            Belum ada kegiatan yang dipublikasikan.
          </p>
        ) : (
          kegiatan.map((item, i) => (
            <article
              key={item.id}
              className="kegiatan-card fade-up cursor-pointer hover:shadow-lg transition-all"
              style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}
              onClick={() => setSelectedKegiatan(item)}
            >
              {/* Image */}
              <div className="kegiatan-img relative">
                {item.foto_url ? (
                  <img
                    src={item.foto_url}
                    alt={item.judul}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-6xl"
                    style={{ background: "var(--green-50)" }}
                  >
                    📸
                  </div>
                )}
                {/* Date chip */}
                <span className="absolute top-3 right-3 chip chip-gold shadow-sm">
                  📅 {new Date(item.tanggal_pelaksanaan).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-base mb-1 line-clamp-2" style={{ color: "var(--text-dark)" }}>
                  {item.judul}
                </h3>
                <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                  {item.deskripsi_singkat}
                </p>

                <button className="text-sm font-semibold mt-2" style={{ color: "var(--green-800)" }}>
                  Lihat Detail &rarr;
                </button>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedKegiatan && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            <button 
              onClick={() => setSelectedKegiatan(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 z-10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="w-full h-64 md:h-80 relative bg-gray-100 flex-shrink-0">
              {selectedKegiatan.foto_url ? (
                <img 
                  src={selectedKegiatan.foto_url} 
                  alt={selectedKegiatan.judul} 
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => openLightbox(selectedKegiatan, selectedKegiatan.foto_url)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gray-100">
                  📸
                </div>
              )}
            </div>

            {/* Content area */}
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold" style={{ color: "var(--green-700)" }}>
                <Calendar size={16} />
                {new Date(selectedKegiatan.tanggal_pelaksanaan).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              
              <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-dark)" }}>
                {selectedKegiatan.judul}
              </h2>
              
              <div className="prose prose-sm max-w-none text-gray-700 mb-8 whitespace-pre-wrap leading-relaxed">
                {selectedKegiatan.deskripsi_singkat}
              </div>

              {/* Gallery Grid */}
              {selectedKegiatan.galeri_urls && selectedKegiatan.galeri_urls.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4" style={{ color: "var(--text-dark)" }}>Galeri Kegiatan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedKegiatan.galeri_urls.map((gUrl: string, idx: number) => (
                      <div 
                        key={idx}
                        className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border border-gray-100 shadow-sm"
                        onClick={() => openLightbox(selectedKegiatan, gUrl)}
                      >
                        <img 
                          src={gUrl} 
                          alt={`Galeri ${idx}`} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxData && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4"
          onClick={handleLightboxClick}
        >
          <button 
            onClick={() => setLightboxData(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors p-2 z-50"
          >
            <X size={32} />
          </button>
          
          {lightboxData.urls.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxData({ ...lightboxData, index: (lightboxData.index - 1 + lightboxData.urls.length) % lightboxData.urls.length }); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-50 bg-black/50 rounded-full"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          <img 
            key={lightboxData.index}
            src={lightboxData.urls[lightboxData.index]} 
            alt="Preview Besar" 
            className="max-w-full max-h-[90vh] object-contain rounded-md animate-in fade-in zoom-in-95 duration-200" 
          />

          {lightboxData.urls.length > 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxData({ ...lightboxData, index: (lightboxData.index + 1) % lightboxData.urls.length }); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 z-50 bg-black/50 rounded-full"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}
          
          {lightboxData.urls.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-widest bg-black/50 px-4 py-2 rounded-full">
              {lightboxData.index + 1} / {lightboxData.urls.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
