"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Phone } from "lucide-react";

interface Pengurus {
  id: string;
  nama: string;
  jabatan: string;
  foto_url?: string;
  no_telp?: string;
  kategori: string;
  urutan: number;
}

interface PengurusListInteractiveProps {
  pengurus: Pengurus[];
}

export default function PengurusListInteractive({ pengurus }: PengurusListInteractiveProps) {
  const [selectedPengurus, setSelectedPengurus] = useState<Pengurus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedPengurus) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPengurus]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleWhatsApp = (e: React.MouseEvent, phone?: string) => {
    e.stopPropagation();
    if (!phone) return;
    
    // Format phone number to start with 62 instead of 0 or +62
    let formattedPhone = phone.replace(/\D/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "62" + formattedPhone.substring(1);
    }
    
    window.open(`https://wa.me/${formattedPhone}`, "_blank");
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pengurus.length === 0 ? (
          <p className="col-span-2 text-sm italic" style={{ color: "var(--text-muted)" }}>
            Belum ada data pengurus.
          </p>
        ) : (
          pengurus.map((p) => (
            <div 
              key={p.id} 
              className="pengurus-card cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => setSelectedPengurus(p)}
            >
              <div className="pengurus-avatar relative group-hover:scale-105 transition-transform duration-300">
                {p.foto_url ? (
                  <img src={p.foto_url} alt={p.nama} className="w-full h-full object-cover" />
                ) : (
                  getInitials(p.nama)
                )}
              </div>
              <p className="font-bold text-sm text-center px-1" style={{ color: "var(--text-dark)" }}>{p.nama}</p>
              <p className="text-xs mt-0.5 text-center text-gray-500">{p.jabatan}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal Popup */}
      {mounted && selectedPengurus && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPengurus(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute top-3 right-3 p-1.5 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors z-10 backdrop-blur-md"
              onClick={() => setSelectedPengurus(null)}
            >
              <X size={20} />
            </button>
            
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center relative">
              {selectedPengurus.foto_url ? (
                <img 
                  src={selectedPengurus.foto_url} 
                  alt={selectedPengurus.nama} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-5xl text-gray-400 font-bold">
                  {getInitials(selectedPengurus.nama)}
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{selectedPengurus.nama}</h3>
              <p className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-4">
                {selectedPengurus.jabatan}
              </p>
              
              {selectedPengurus.no_telp ? (
                <button 
                  onClick={(e) => handleWhatsApp(e, selectedPengurus.no_telp)}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone size={18} fill="currentColor" />
                  Hubungi via WhatsApp
                </button>
              ) : (
                <p className="text-xs text-gray-400 italic">Nomor telepon tidak tersedia</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
