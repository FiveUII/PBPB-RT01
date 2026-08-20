import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { getKegiatan } from "@/lib/actions";

export const metadata = {
  title: "Kegiatan Warga | RT 01 Perumahan Harmoni",
  description: "Dokumentasi kegiatan dan acara warga RT 01 Perumahan Harmoni.",
};

export default async function KegiatanPage() {
  const kegiatan = await getKegiatan();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Kegiatan Warga" showBack />

      <main className="container-app py-6 flex-1">
        <p className="text-sm mb-5 fade-up" style={{ color: "var(--text-muted)" }}>
          Dokumentasi kegiatan warga RT 01 — diurutkan terbaru
        </p>

        <div className="flex flex-col gap-4">
          {kegiatan.length === 0 ? (
            <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>
              Belum ada kegiatan yang dipublikasikan.
            </p>
          ) : (
            kegiatan.map((item, i) => (
              <article
                key={item.id}
                className="kegiatan-card fade-up"
                style={{ animationDelay: `${0.1 * i}s`, opacity: 0 }}
              >
                {/* Image */}
                <div className="kegiatan-img relative">
                  {item.foto_url ? (
                    <img
                      src={item.foto_url}
                      alt={item.judul}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl"
                      style={{ background: "var(--green-50)" }}>
                      📸
                    </div>
                  )}
                  {/* Date chip */}
                  <span
                    className="absolute top-3 right-3 chip chip-gold"
                  >
                    📅 {new Date(item.tanggal_pelaksanaan).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-base mb-1" style={{ color: "var(--text-dark)" }}>
                    {item.judul}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.deskripsi_singkat}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Load More */}
        {kegiatan.length > 0 && (
          <div className="mt-6 text-center">
            <button className="btn-outline w-full">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
