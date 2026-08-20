"use client";
import Link from "next/link";
import { useState } from "react";
import { Home } from "lucide-react";

const navItems = [
  { href: "/profil",       label: "Profil RT" },
  { href: "/kegiatan",     label: "Kegiatan" },
  { href: "/pengumuman",   label: "Pengumuman" },
  { href: "/badan-usaha",  label: "Badan Usaha" },
];

export default function Topbar({
  title,
  showBack = false,
  backHref = "/",
}: {
  title: string;
  showBack?: boolean;
  backHref?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        {showBack ? (
          <Link href={backHref} aria-label="Kembali" className="text-white p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </Link>
        ) : (
          <span className="flex items-center gap-2 text-white font-bold text-base">
            <Home size={20} /> RT 01
          </span>
        )}

        <span className="topbar-title">{title}</span>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu navigasi"
          className="text-white p-1"
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* Dropdown Menu */}
      {open && (
        <nav
          className="fixed top-[52px] left-0 right-0 z-40 shadow-lg"
          style={{ background: "var(--green-900)" }}
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-5 py-4 text-white font-medium border-b border-white/10 hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
