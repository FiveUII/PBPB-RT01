import Link from "next/link";

import Footer from "@/components/Footer";
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

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f8]">
      {/* HERO REDESIGN (FULL SCREEN WITH CARDS) */}
      <div className="relative flex flex-col items-center justify-center text-center px-2 sm:px-5 overflow-hidden min-h-[100dvh]">
        
        {/* Abstract Red and White Wavy Background Top */}
        <svg className="absolute top-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: 'clamp(120px, 20vh, 250px)' }}>
          <path fill="#e11d48" d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,64C672,75,768,117,864,122.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          <path fill="#be123c" fillOpacity="0.4" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>

        {/* Abstract Red and White Wavy Background Bottom */}
        <svg className="absolute bottom-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ height: 'clamp(120px, 20vh, 250px)', transform: 'rotate(180deg)' }}>
          <path fill="#e11d48" d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,64C672,75,768,117,864,122.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
          <path fill="#be123c" fillOpacity="0.2" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
        </svg>

        {/* Minimal Pattern / Confetti Decoration */}
        <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none mix-blend-multiply" style={{
          backgroundImage: 'radial-gradient(#e11d48 2px, transparent 2px), radial-gradient(#d4a017 2px, transparent 2px)',
          backgroundSize: '40px 40px, 24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }} />



        {/* Main Content (Title) */}
        <div className="relative z-10 fade-up w-full mt-16 md:mt-24 max-w-5xl mx-auto px-4 flex-1 flex flex-col justify-center">
          <div className="mx-auto transform transition-all py-4">
            <h2 className="text-sm md:text-xl font-bold text-red-700 mb-2 tracking-widest uppercase drop-shadow-sm">
              Selamat Datang di Website
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[1.1] mb-2" style={{
              background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 15px rgba(22, 163, 74, 0.15)',
              WebkitTextStroke: '0.5px rgba(21, 128, 61, 0.3)'
            }}>
              Guyub Rukun <span className="block md:inline">Warga RT 01</span>
            </h1>
            <div className="w-16 md:w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 mx-auto rounded-full my-4 md:my-6 shadow-sm" />
            <p className="text-lg md:text-2xl font-bold text-gray-800 tracking-widest uppercase">
              Perumahan Bukit Pinang Bahari
              <span className="block text-sm md:text-lg text-gray-600 mt-1 tracking-wider font-semibold">Kelurahan Gunung Panjang, Samarinda</span>
            </p>
          </div>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 pb-24 md:pb-32 mt-auto fade-up fade-up-delay-1 flex flex-col gap-4">

          {/* NAV CARDS (Grid for Desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-2">
            {navCards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                className="card bg-white/90 backdrop-blur-md block no-underline group hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(27,67,50,0.14)] transition-all"
              >
                <div className="flex flex-row md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-4 p-5 h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform group-hover:scale-105"
                    style={{ background: card.color + "18" }}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <p className="font-bold text-base" style={{ color: card.color }}>
                      {card.title}
                    </p>
                    <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {card.desc}
                    </p>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:hidden lg:block shrink-0" style={{ color: "var(--text-muted)" }}>
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}
