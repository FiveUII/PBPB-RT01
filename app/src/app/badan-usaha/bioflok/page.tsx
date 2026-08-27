import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

import { getPengurus, getBadanUsaha } from "@/lib/actions";
import Link from "next/link";
import { MapPin } from "lucide-react";
import ImageModal from "@/components/ImageModal";
import PengurusListInteractive from "@/components/PengurusListInteractive";

export const metadata = {
  title: "Ternak Ikan Bioflok | RT 01 Perumahan Harmoni",
  description: "Informasi unit usaha Ternak Ikan Bioflok RT 01 Perumahan Harmoni.",
};

export default async function BioflokPage() {
  const pengurus = await getPengurus("BIOFLOK");
  const semuaUsaha = await getBadanUsaha();
  const infoUsaha = semuaUsaha.find(u => u.nama_usaha.toLowerCase().includes("bioflok"));


  const allImages = [infoUsaha?.foto_url, ...(infoUsaha?.galeri_urls || [])].filter(Boolean) as string[];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Ternak Ikan Bioflok" showBack backHref="/badan-usaha" />

      <main className="flex-1">
        {/* Banner/Hero */}
        {infoUsaha?.foto_url ? (
          <ImageModal images={allImages} initialIndex={0}>
            <section 
              className="relative overflow-hidden bg-cover bg-center min-h-[300px] md:min-h-[400px] flex items-end p-6 md:p-10 group"
              style={{ background: `url(${infoUsaha.foto_url}) center 80%/cover no-repeat` }}
            >
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))" }}></div>
              <div className="relative z-10 w-full fade-up">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{infoUsaha?.nama_usaha || "Ternak Ikan Bioflok"}</h1>
                  <p className="text-green-100 text-sm opacity-90" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>Unit Usaha Warga RT 01</p>
                </div>
              </div>
            </section>
          </ImageModal>
        ) : (
          <section 
            className="relative overflow-hidden bg-cover bg-center min-h-[300px] md:min-h-[400px] flex items-end p-6 md:p-10"
            style={{ background: "var(--green-800)" }}
          >
            <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.1)" }}></div>
            <div className="relative z-10 w-full fade-up">
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">{infoUsaha?.nama_usaha || "Ternak Ikan Bioflok"}</h1>
                <p className="text-green-100 text-sm opacity-90">Unit Usaha Warga RT 01</p>
              </div>
            </div>
          </section>
        )}

        <div className="container-app py-6 flex flex-col gap-5 max-w-3xl mx-auto w-full">
          {/* Status chips */}
          <div className="flex gap-2 fade-up">
            <span className="chip chip-green">✅ Aktif</span>
            <span className="chip chip-green">🐟 Ikan Lele & Nila</span>
          </div>

          {/* Deskripsi */}
          <section className="card p-5 fade-up fade-up-delay-1">
            <h2 className="section-title mb-3">Tentang Usaha</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {infoUsaha?.deskripsi || `Unit usaha Ternak Ikan Bioflok RT 01 menggunakan teknologi bioflok — sistem budidaya ikan intensif yang hemat air dan lahan. Ikan yang dibudidayakan meliputi ikan lele dan nila dengan siklus panen setiap 60–90 hari.`}
            </p>
          </section>
          
          {/* Gallery */}
          {infoUsaha?.galeri_urls && infoUsaha.galeri_urls.length > 0 && (
            <section className="fade-up fade-up-delay-1">
               <h2 className="section-title mb-3 px-1">Galeri Foto</h2>
               <div className="flex gap-3 overflow-x-auto pb-2 px-1 snap-x hide-scrollbar">
                 {infoUsaha.galeri_urls.map((url: string, idx: number) => {
                   const globalIdx = infoUsaha?.foto_url ? idx + 1 : idx;
                   return (
                     <div key={idx} className="w-36 h-36 flex-shrink-0 snap-center">
                       <ImageModal images={allImages} initialIndex={globalIdx}>
                         <img src={url} alt={`Galeri ${idx}`} className="w-full h-full rounded-lg object-cover shadow-sm border border-gray-100 hover:opacity-90 transition-opacity" />
                       </ImageModal>
                     </div>
                   );
                 })}
               </div>
            </section>
          )}

          {/* Info Operasional */}
          <section className="card p-5 fade-up fade-up-delay-2">
            <h2 className="section-title mb-3">Informasi Operasional</h2>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📍", label: "Lokasi Kolam", val: "Area Fasum RT, Blok F" },
                { icon: "🗓️", label: "Jadwal", val: infoUsaha?.jadwal_operasional || "Setiap 60–90 hari" },
                { icon: "📦", label: "Kapasitas", val: "±500 kg per siklus" },
                { icon: "📞", label: "Kontak", val: infoUsaha?.kontak_whatsapp || "Hendra Putra" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{info.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{info.label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>{info.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pengurus */}
          <section className="fade-up fade-up-delay-3">
            <h2 className="section-title">Susunan Pengurus</h2>
            <PengurusListInteractive pengurus={pengurus} />
          </section>

          {/* Lokasi */}
          <section className="card fade-up fade-up-delay-4">
            <div
              className="flex items-center justify-center"
              style={{ height: 140, background: "var(--green-50)" }}
            >
              <MapPin size={48} style={{ color: "var(--green-800)" }} />
            </div>
            <div className="p-5">
              <h2 className="section-title mb-1">Lokasi Ternak Bioflok</h2>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                Area Fasum RT, Blok F
              </p>
              <a
                href="https://maps.app.goo.gl/vaw3FppLZii7Nf6H6"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full text-center flex justify-center items-center gap-2"
              >
                <MapPin size={18} /> Buka di Google Maps
              </a>
            </div>
          </section>

          <Link href="/badan-usaha" className="btn-outline w-full text-center mt-2 fade-up">
            ← Kembali ke Badan Usaha
          </Link>
        </div>
      </main>

      <Footer />

    </div>
  );
}
