import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import PushNotifButton from "@/components/PushNotifButton";
import { getPengumuman } from "@/lib/actions";
import Link from "next/link";
import { BellRing } from "lucide-react";

export const metadata = {
  title: "Pengumuman Warga | RT 01 Perumahan Bukit Pinang Bahari",
  description: "Informasi dan pengumuman terbaru untuk warga RT 01 Perumahan Bukit Pinang Bahari.",
};

export default async function PengumumanPage() {
  const pengumumanList = await getPengumuman();

  const getTagClass = (tipe: string) => {
    switch (tipe?.toUpperCase()) {
      case "PENTING": return "chip-red";
      case "JADWAL": return "chip-blue";
      default: return "chip-green";
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Pengumuman" showBack />

      <main className="container-app py-6 flex-1">
        {/* Subscribe Banner */}
        <div
          className="rounded-2xl p-5 mb-6 fade-up"
          style={{
            background: "linear-gradient(135deg, var(--green-800) 0%, var(--green-700) 100%)",
          }}
        >
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 text-white mt-0.5"><BellRing size={28} /></span>
            <div>
              <p className="font-bold text-white text-base">Aktifkan Notifikasi</p>
              <p className="text-white/70 text-xs mt-0.5 mb-3">
                Dapatkan pengumuman penting langsung di HP Anda
              </p>
              <PushNotifButton />
            </div>
          </div>
        </div>

        {/* Feed */}
        <h2 className="section-title fade-up fade-up-delay-1">Semua Pengumuman</h2>
        <div className="flex flex-col gap-3">
          {pengumumanList.length === 0 ? (
            <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
              Belum ada pengumuman terbaru.
            </p>
          ) : (
            pengumumanList.map((item, i) => (
              <div
                key={item.id}
                className="card fade-up"
                style={{ animationDelay: `${0.1 * i}s`, opacity: 0, borderLeft: "4px solid var(--gold)" }}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm leading-tight" style={{ color: "var(--text-dark)" }}>
                      {item.judul}
                    </h3>
                    <span className={`chip ${getTagClass(item.tipe)} flex-shrink-0 text-[10px]`}>
                      {item.tipe}
                    </span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    📅 {new Date(item.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
