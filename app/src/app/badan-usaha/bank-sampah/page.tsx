import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getPengurus } from "@/lib/actions";
import Link from "next/link";

export const metadata = {
  title: "Bank Sampah | RT 01 Perumahan Harmoni",
  description: "Informasi unit usaha Bank Sampah Guyub Rukun RT 01 Perumahan Harmoni.",
};

export default async function BankSampahPage() {
  const pengurus = await getPengurus("BANK_SAMPAH");

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
      <Topbar title="Bank Sampah" showBack />

      <main className="flex-1">
        {/* Hero */}
        <div
          className="flex items-end px-5 pb-6 pt-16"
          style={{
            minHeight: 200,
            background: "linear-gradient(160deg, #92400e, var(--gold))",
          }}
        >
          <div>
            <span className="text-5xl block mb-2">♻️</span>
            <h1 className="text-2xl font-extrabold text-white">Bank Sampah Guyub Rukun</h1>
            <p className="text-white/70 text-sm mt-1">Unit Usaha RT 01 Perumahan Harmoni</p>
          </div>
        </div>

        <div className="container-app py-6 flex flex-col gap-5">
          {/* Status chips */}
          <div className="flex gap-2 flex-wrap fade-up">
            <span className="chip chip-green">✅ Aktif</span>
            <span className="chip chip-gold">📅 Setiap Minggu</span>
          </div>

          {/* Deskripsi */}
          <section className="card p-5 fade-up fade-up-delay-1">
            <h2 className="section-title mb-3">Tentang Usaha</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Bank Sampah Guyub Rukun adalah program pengelolaan sampah berbasis komunitas yang
              mengubah sampah anorganik rumah tangga menjadi nilai ekonomis.
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--text-muted)" }}>
              Warga dapat menukarkan sampah (botol plastik, kardus, kertas, logam) dengan saldo
              tabungan atau langsung ditukar sembako sesuai ketentuan yang berlaku.
            </p>
          </section>

          {/* Info Operasional */}
          <section className="card p-5 fade-up fade-up-delay-2">
            <h2 className="section-title mb-3">Informasi Operasional</h2>
            <div className="flex flex-col gap-3">
              {[
                { icon: "📍", label: "Lokasi Penimbangan", val: "Poskamling RT, Blok A" },
                { icon: "🕗", label: "Jadwal Operasional", val: "Setiap Minggu, 08.00–11.00 WIB" },
                { icon: "🗑️", label: "Sampah Diterima", val: "Plastik, Kardus, Kertas, Logam" },
                { icon: "💰", label: "Sistem Tukar", val: "Saldo Tabungan / Sembako" },
                { icon: "📞", label: "Kontak", val: "Dewi Rahayu (0812-XXXX-XXXX)" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{info.icon}</span>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{info.label}</p>
                    <p className="text-sm font-medium" style={{ color: "var(--text-dark)" }}>{info.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pengurus */}
          <section className="fade-up fade-up-delay-3">
            <h2 className="section-title">Susunan Pengurus</h2>
            <div className="grid grid-cols-3 gap-3">
              {pengurus.length === 0 ? (
                <p className="col-span-3 text-sm italic" style={{ color: "var(--text-muted)" }}>
                  Belum ada data pengurus bank sampah.
                </p>
              ) : (
                pengurus.map((p) => (
                  <div key={p.id} className="pengurus-card">
                    <div className="pengurus-avatar text-base relative">
                      {p.foto_url ? (
                        <img src={p.foto_url} alt={p.nama} className="w-full h-full object-cover" />
                      ) : (
                        getInitials(p.nama)
                      )}
                    </div>
                    <p className="font-bold text-xs" style={{ color: "var(--text-dark)" }}>{p.nama}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>{p.jabatan}</p>
                  </div>
                ))
              )}
            </div>
          </section>

          <Link href="/badan-usaha" className="btn-outline w-full text-center mt-2 fade-up">
            ← Kembali ke Badan Usaha
          </Link>
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
