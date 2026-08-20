export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto py-8 px-5 text-center text-white/80 text-sm"
      style={{ background: "var(--green-900)" }}
    >
      <p className="font-bold text-white text-base mb-1">🏘️ RT 01 Perumahan Harmoni</p>
      <p className="text-white/60">Bersatu · Maju · Sejahtera</p>
      <p className="mt-4 text-white/40 text-xs">© {year} RT 01 Perumahan Harmoni. Semua hak dilindungi.</p>
    </footer>
  );
}
