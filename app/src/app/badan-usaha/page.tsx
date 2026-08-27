import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

import Link from "next/link";
import { getBadanUsaha } from "@/lib/actions";

const staticUnits = [
  {
    href: "/badan-usaha/bioflok",
    icon: "🐟",
    keyword: "bioflok",
    nama: "Ternak Ikan Bioflok",
    deskripsi:
      "Budidaya ikan nila menggunakan teknologi bioflok hemat air dan lahan.",
    chips: ["Aktif", "Menjual Ikan Nila"],
    btnClass: "btn-primary",
    accent: "var(--green-800)",
  },
  {
    href: "/badan-usaha/bank-sampah",
    icon: "♻️",
    keyword: "sampah",
    nama: "Bank Sampah Guyub Rukun",
    deskripsi:
      "Tukarkan sampah anorganik menjadi saldo tabungan atau sembako setiap Sabtu pagi.",
    chips: ["Aktif", "Setiap Sabtu"],
    btnClass: "btn-accent",
    accent: "var(--gold)",
  },
];

export const metadata = {
  title: "Badan Usaha Milik RT | RT 01 Perumahan Bukit Pinang Bahari",
  description: "Unit usaha produktif yang dikelola oleh warga RT 01 Perumahan Bukit Pinang Bahari.",
};

export default async function BadanUsahaPage() {
  const usahaList = await getBadanUsaha();

  const units = staticUnits.map(unit => {
    const dbData = usahaList.find(u => u.nama_usaha.toLowerCase().includes(unit.keyword));
    return {
      ...unit,
      nama: dbData?.nama_usaha || unit.nama,
      deskripsi: dbData?.deskripsi || unit.deskripsi,
      foto_url: dbData?.foto_url || null,
    };
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Badan Usaha RT" showBack />

      <main className="container-app py-6 flex-1">
        {/* Intro */}
        <section className="card p-5 mb-6 fade-up">
          <h2 className="section-title mb-2">Unit Usaha Warga RT 01</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            RT 01 Perumahan Harmoni mengelola dua unit usaha produktif untuk meningkatkan
            kesejahteraan dan kemandirian ekonomi warga.
          </p>
          <div className="flex gap-2 mt-3">
            <span className="chip chip-green">2 Unit Aktif</span>
            <span className="chip chip-green">Dikelola Warga</span>
          </div>
        </section>

        {/* Unit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {units.map((unit, i) => (
            <div
              key={unit.href}
              className="usaha-card bg-white fade-up overflow-hidden"
              style={{ animationDelay: `${0.15 * (i + 1)}s`, opacity: 0 }}
            >
              {/* Hero */}
              <div 
                className="usaha-hero relative flex items-end p-5 h-32" 
                style={unit.foto_url ? { background: `url(${unit.foto_url}) center 80%/cover no-repeat` } : { background: unit.accent }}
              >
                <div 
                  className="absolute inset-0" 
                  style={unit.foto_url ? { background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))" } : { background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} 
                />
                <div className="relative z-10 flex items-end gap-3 w-full">
                  {!unit.foto_url && <span className="text-5xl">{unit.icon}</span>}
                  <h3 className="font-bold text-white text-lg leading-tight" style={unit.foto_url ? { textShadow: "0 2px 4px rgba(0,0,0,0.5)" } : undefined}>{unit.nama}</h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  {unit.chips.map((c) => (
                    <span key={c} className="chip chip-green">{c}</span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
                  {unit.deskripsi}
                </p>
                <Link href={unit.href} className={`${unit.btnClass} w-full justify-center`}>
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />

    </div>
  );
}
