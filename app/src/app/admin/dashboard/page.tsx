import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/admin/dashboard/LogoutButton";
import Link from "next/link";
import type { Metadata } from "next";
import { getStatistikKunjungan } from "@/lib/actions";
import StatistikWidget from "@/components/StatistikWidget";

import { Calendar, BellRing, Users, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard Admin | RT 01 Perumahan Harmoni",
};

const menuItems = [
  { href: "/admin/dashboard/kegiatan", icon: <Calendar size={24} />, label: "Kelola Kegiatan", desc: "Tambah & edit dokumentasi acara", color: "var(--green-800)" },
  { href: "/admin/dashboard/pengumuman", icon: <BellRing size={24} />, label: "Buat Pengumuman", desc: "Kirim pengumuman ke warga", color: "var(--gold)" },
  { href: "/admin/dashboard/pengurus", icon: <Users size={24} />, label: "Kelola Pengurus", desc: "Atur susunan pengurus RT", color: "var(--green-700)" },
  { href: "/admin/dashboard/usaha", icon: <Briefcase size={24} />, label: "Info Badan Usaha", desc: "Edit info unit usaha RT", color: "var(--green-900)" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin");
  
  const stats = await getStatistikKunjungan();

  return (
    <div className="min-h-screen flex flex-col relative bg-[#f4f6f8] overflow-x-hidden">
      {/* Background Decor */}
      <svg className="absolute top-0 left-0 w-full z-0 pointer-events-none" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" style={{ height: '120px' }}>
        <path fill="#e11d48" d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,64C672,75,768,117,864,122.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        <path fill="#be123c" fillOpacity="0.3" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
      </svg>
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: 'radial-gradient(#e11d48 2px, transparent 2px), radial-gradient(#d4a017 2px, transparent 2px)',
        backgroundSize: '40px 40px, 24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }} />

      {/* Header */}
      <header className="topbar relative z-20 bg-transparent shadow-none px-5 py-4">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <span className="topbar-title">Dashboard Admin</span>
          <LogoutButton />
        </div>
      </header>

      <main className="container-app py-6 flex flex-col gap-5 flex-1">
        {/* Welcome */}
        <div
          className="rounded-2xl p-5 fade-up"
          style={{ background: "linear-gradient(135deg, var(--green-900), var(--green-700))" }}
        >
          <p className="text-white/70 text-xs mb-1">Selamat datang 👋</p>
          <p className="font-bold text-white text-lg">{user.email}</p>
          <span className="chip chip-green mt-2" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
            Pengurus RT
          </span>
        </div>

        {/* Statistik Widget */}
        <section className="fade-up fade-up-delay-1">
          <StatistikWidget total={stats.total} hariIni={stats.hariIni} rataRata={stats.rataRata} variant="admin" />
        </section>

        {/* Quick Actions */}
        <section className="fade-up fade-up-delay-2">
          <h2 className="section-title">Kelola Konten</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card p-4 block no-underline group hover:shadow-lg transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                  style={{ background: item.color + "18" }}
                >
                  {item.icon}
                </div>
                <p className="font-bold text-sm" style={{ color: item.color }}>{item.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Info */}
        <div
          className="rounded-2xl p-4 text-sm fade-up fade-up-delay-3"
          style={{ background: "var(--green-50)", color: "var(--green-800)" }}
        >
          <p className="font-semibold mb-1">💡 Panduan Penggunaan</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Pilih menu di atas untuk mengelola konten website. Setiap perubahan akan langsung
            tampil di halaman publik.
          </p>
        </div>
      </main>
    </div>
  );
}
