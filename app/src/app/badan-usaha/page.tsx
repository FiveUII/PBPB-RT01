import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Link from "next/link";

const units = [
  {
    href: "/badan-usaha/bioflok",
    icon: "🐟",
    nama: "Ternak Ikan Bioflok",
    deskripsi:
      "Budidaya ikan lele dan nila menggunakan teknologi bioflok hemat air dan lahan.",
    chips: ["Aktif", "Ikan Lele & Nila"],
    btnClass: "btn-primary",
    accent: "var(--green-800)",
  },
  {
    href: "/badan-usaha/bank-sampah",
    icon: "♻️",
    nama: "Bank Sampah Guyub Rukun",
    deskripsi:
      "Tukarkan sampah anorganik menjadi saldo tabungan atau sembako setiap Minggu pagi.",
    chips: ["Aktif", "Setiap Minggu"],
    btnClass: "btn-accent",
    accent: "var(--gold)",
  },
];

export const metadata = {
  title: "Badan Usaha | RT 01 Perumahan Harmoni",
  description: "Unit usaha produktif milik warga RT 01 Perumahan Harmoni.",
};

export default function BadanUsahaPage() {
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
        <div className="flex flex-col gap-5">
          {units.map((unit, i) => (
            <div
              key={unit.href}
              className="usaha-card bg-white fade-up"
              style={{ animationDelay: `${0.15 * (i + 1)}s`, opacity: 0 }}
            >
              {/* Hero */}
              <div className="usaha-hero" style={{ background: unit.accent }}>
                <div className="usaha-hero-overlay" />
                <div className="relative z-10 flex items-end gap-3 w-full">
                  <span className="text-5xl">{unit.icon}</span>
                  <h3 className="font-bold text-white text-lg leading-tight">{unit.nama}</h3>
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
      <WhatsAppFAB />
    </div>
  );
}
