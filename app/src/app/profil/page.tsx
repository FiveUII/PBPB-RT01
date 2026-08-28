import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import { MapPin } from "lucide-react";
import PengurusListInteractive from "@/components/PengurusListInteractive";
import ProfilGalleryClient from "./ProfilGalleryClient";

import { getPengurus, getProfilRT } from "@/lib/actions";

export const metadata = {
  title: "Profil RT | RT 01 Perumahan Bukit Pinang Bahari",
  description: "Profil, visi misi, susunan pengurus, dan lokasi RT 01 Perumahan Bukit Pinang Bahari.",
};

export default async function ProfilPage() {
  const pengurus = await getPengurus("RT");
  const profilRT = await getProfilRT();
  const misiArray = profilRT?.misi ? profilRT.misi.split("\n").filter((m: string) => m.trim() !== "") : [];



  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Profil RT" showBack />

      <main className="container-app py-6 flex flex-col gap-6 flex-1">
        {/* Tentang */}
        <section className="card p-5 fade-up">
          <h2 className="section-title mb-3">Tentang RT 01 Perumahan Bukit Pinang Bahari</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-muted)" }}>
            {profilRT?.deskripsi || `RT 01 Perumahan Bukit Pinang Bahari adalah komunitas residensial yang mengutamakan kebersamaan, keamanan, dan kelestarian lingkungan hidup. Berlokasi strategis dengan fasilitas lengkap, kami berkomitmen menciptakan ruang tinggal yang asri dan nyaman bagi seluruh warga dan keluarga.`}
          </p>
        </section>
        
        {/* Gallery Slider */}
        <ProfilGalleryClient galeriUrls={profilRT?.galeri_urls || []} />

        {/* Visi Misi */}
        <section className="fade-up fade-up-delay-1">
          <h2 className="section-title">Visi & Misi</h2>
          <div className="flex flex-col gap-3">
            <div className="card p-5" style={{ borderLeft: "4px solid var(--gold)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--gold)" }}>
                Visi
              </p>
              <p className="font-semibold text-sm whitespace-pre-line" style={{ color: "var(--text-dark)" }}>
                {profilRT?.visi || "Menjadi lingkungan yang aman, bersih, harmonis, dan sejahtera bagi seluruh warga."}
              </p>
            </div>
            <div className="card p-5" style={{ borderLeft: "4px solid var(--green-800)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--green-800)" }}>
                Misi
              </p>
              <ul className="text-sm space-y-1.5" style={{ color: "var(--text-muted)" }}>
                {misiArray.length > 0 ? (
                  misiArray.map((m: string) => (
                    <li key={m} className="flex items-start gap-2">
                      <span style={{ color: "var(--green-800)" }} className="mt-0.5 flex-shrink-0">✓</span>
                      <span>{m}</span>
                    </li>
                  ))
                ) : (
                  [
                    "Meningkatkan keamanan dan ketertiban lingkungan",
                    "Menjaga kebersihan dan kelestarian lingkungan hidup",
                    "Mempererat tali silaturahmi antar warga",
                    "Mengembangkan potensi ekonomi warga melalui BUMRT",
                  ].map((m) => (
                    <li key={m} className="flex items-start gap-2">
                      <span style={{ color: "var(--green-800)" }} className="mt-0.5 flex-shrink-0">✓</span>
                      <span>{m}</span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* Pengurus */}
        <section className="fade-up fade-up-delay-2">
          <h2 className="section-title">Susunan Pengurus RT</h2>
          <PengurusListInteractive pengurus={pengurus} />
        </section>

        {/* Lokasi */}
        <section className="card fade-up fade-up-delay-3">
          <div
            className="flex items-center justify-center"
            style={{ height: 140, background: "var(--green-50)" }}
          >
            <MapPin size={48} style={{ color: "var(--green-800)" }} />
          </div>
          <div className="p-5">
            <h2 className="section-title mb-1">Lokasi Perumahan</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Perumahan Bukit Pinang Bahari, Samarinda
            </p>
            <a
              href="https://maps.app.goo.gl/K8SQSLTxtFdxwntg8"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center flex justify-center items-center gap-2"
            >
              <MapPin size={18} /> Buka di Google Maps
            </a>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
