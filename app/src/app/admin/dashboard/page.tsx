import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/admin/dashboard/LogoutButton";
import Link from "next/link";
import type { Metadata } from "next";

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      {/* Header */}
      <header className="topbar">
        <span className="topbar-title">Dashboard Admin</span>
        <LogoutButton />
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

        {/* Quick Actions */}
        <section className="fade-up fade-up-delay-1">
          <h2 className="section-title">Kelola Konten</h2>
          <div className="grid grid-cols-2 gap-3">
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
          className="rounded-2xl p-4 text-sm fade-up fade-up-delay-2"
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
