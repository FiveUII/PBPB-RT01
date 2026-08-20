import Link from "next/link";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import Footer from "@/components/Footer";
import { getPengumuman } from "@/lib/actions";
import { Home, Calendar, Briefcase, ChevronRight } from "lucide-react";

const navCards = [
  {
    href: "/profil",
    icon: <Home size={28} />,
    title: "Profil RT",
    desc: "Kenali lingkungan, visi misi, dan susunan pengurus kami",
    color: "var(--green-800)",
  },
  {
    href: "/kegiatan",
    icon: <Calendar size={28} />,
    title: "Kegiatan",
    desc: "Dokumentasi acara dan kegiatan warga terkini",
    color: "var(--green-700)",
  },
  {
    href: "/badan-usaha",
    icon: <Briefcase size={28} />,
    title: "Badan Usaha",
    desc: "Unit usaha produktif milik warga RT 01",
    color: "var(--green-900)",
  },
];

export default async function HomePage() {
  const pengumumanList = await getPengumuman();
  const latestPengumuman = pengumumanList[0];

  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-5 pb-12 pt-16"
        style={{
          background: "linear-gradient(160deg, var(--green-900) 0%, var(--green-800) 60%, var(--green-700) 100%)",
          minHeight: "60vh",
        }}
      >
        {/* Top bar inside hero */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-4">
          <span className="text-white font-bold flex items-center gap-2">
            <Home size={20} /> RT 01
          </span>
          <Link
            href="/admin"
            className="text-white/60 text-xs font-medium border border-white/20 rounded-full px-3 py-1 hover:bg-white/10 transition"
          >
            Admin
          </Link>
        </div>

        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "var(--gold)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-10"
          style={{ background: "var(--gold)", transform: "translate(-30%, 30%)" }} />

        <div className="relative z-10 fade-up">
          <div className="flex justify-center mb-4">
            <Home size={48} color="white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white leading-tight mb-2">
            Selamat Datang<br />di Perumahan Harmoni
          </h1>
          <p className="text-white/70 text-sm mb-6">
            RT 01 · Blok A–F · Bersatu, Maju, Sejahtera
          </p>
        </div>
      </div>

      {/* PENGUMUMAN BANNER */}
      {latestPengumuman && (
        <div className="container-app py-5">
          <Link href="/pengumuman" className="announcement-card block no-underline fade-up fade-up-delay-1">
            <span className="text-2xl flex-shrink-0">📢</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm" style={{ color: "var(--text-dark)" }}>
                Pengumuman Terbaru
              </p>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                {latestPengumuman.judul} — {new Date(latestPengumuman.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: "var(--text-muted)" }}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      )}

      {/* NAV CARDS */}
      <div className="container-app pb-8 pt-2">
        <h2 className="section-title fade-up fade-up-delay-1">Layanan Warga</h2>
        <div className="flex flex-col gap-4">
          {navCards.map((card, i) => (
            <Link
              key={card.href}
              href={card.href}
              className="card block no-underline group fade-up"
              style={{ animationDelay: `${0.15 * (i + 1)}s`, opacity: 0 }}
            >
              <div className="flex items-center gap-4 p-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105"
                  style={{ background: card.color + "18" }}
                >
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-base" style={{ color: card.color }}>
                    {card.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {card.desc}
                  </p>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
