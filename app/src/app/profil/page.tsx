import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getPengurus } from "@/lib/actions";

export const metadata = {
  title: "Profil RT | RT 01 Perumahan Harmoni",
  description: "Profil, visi misi, susunan pengurus, dan lokasi RT 01 Perumahan Harmoni.",
};

export default async function ProfilPage() {
  const pengurus = await getPengurus("RT");

  // Helper to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Profil RT" showBack />

      <main className="container-app py-6 flex flex-col gap-6 flex-1">
        {/* Tentang */}
        <section className="card p-5 fade-up">
          <h2 className="section-title mb-3">Tentang RT 01 Perumahan Harmoni</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            RT 01 Perumahan Harmoni adalah komunitas residensial yang mengutamakan kebersamaan,
            keamanan, dan kelestarian lingkungan hidup. Berlokasi strategis dengan fasilitas
            lengkap, kami berkomitmen menciptakan ruang tinggal yang asri dan nyaman bagi
            seluruh warga dan keluarga.
          </p>
        </section>

        {/* Visi Misi */}
        <section className="fade-up fade-up-delay-1">
          <h2 className="section-title">Visi & Misi</h2>
          <div className="flex flex-col gap-3">
            <div className="card p-5" style={{ borderLeft: "4px solid var(--gold)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--gold)" }}>
                Visi
              </p>
              <p className="font-semibold text-sm" style={{ color: "var(--text-dark)" }}>
                Menjadi lingkungan yang aman, bersih, harmonis, dan sejahtera bagi seluruh warga.
              </p>
            </div>
            <div className="card p-5" style={{ borderLeft: "4px solid var(--green-800)" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--green-800)" }}>
                Misi
              </p>
              <ul className="text-sm space-y-1.5" style={{ color: "var(--text-muted)" }}>
                {[
                  "Meningkatkan keamanan dan ketertiban lingkungan",
                  "Menjaga kebersihan dan kelestarian lingkungan hidup",
                  "Mempererat tali silaturahmi antar warga",
                  "Mengembangkan potensi ekonomi warga melalui BUMRT",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-2">
                    <span style={{ color: "var(--green-800)" }} className="mt-0.5 flex-shrink-0">✓</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pengurus */}
        <section className="fade-up fade-up-delay-2">
          <h2 className="section-title">Susunan Pengurus RT</h2>
          <div className="grid grid-cols-2 gap-3">
            {pengurus.length === 0 ? (
              <p className="col-span-2 text-sm italic" style={{ color: "var(--text-muted)" }}>
                Belum ada data pengurus.
              </p>
            ) : (
              pengurus.map((p) => (
                <div key={p.id} className="pengurus-card">
                  <div className="pengurus-avatar relative">
                    {p.foto_url ? (
                      <img src={p.foto_url} alt={p.nama} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(p.nama)
                    )}
                  </div>
                  <p className="font-bold text-sm" style={{ color: "var(--text-dark)" }}>{p.nama}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{p.jabatan}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Lokasi */}
        <section className="card fade-up fade-up-delay-3">
          <div
            className="flex items-center justify-center text-6xl"
            style={{ height: 140, background: "var(--green-50)" }}
          >
            🗺️
          </div>
          <div className="p-5">
            <h2 className="section-title mb-1">Lokasi Perumahan</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Perumahan Harmoni, Blok A–F
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full text-center block"
            >
              📍 Buka di Google Maps
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
