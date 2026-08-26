import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

import { getKegiatan } from "@/lib/actions";

export const metadata = {
  title: "Kegiatan Warga | RT 01 Perumahan Bukit Pinang Bahari",
  description: "Dokumentasi kegiatan dan acara warga RT 01 Perumahan Bukit Pinang Bahari.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                    {item.deskripsi_singkat}
                  </p>

                  {/* Gallery */}
                  {item.galeri_urls && item.galeri_urls.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 snap-x hide-scrollbar">
                      {item.galeri_urls.map((gUrl: string, idx: number) => (
                        <img key={idx} src={gUrl} alt={`Galeri ${idx}`} className="w-20 h-20 rounded-md object-cover flex-shrink-0 snap-center shadow-sm border border-gray-100" />
                      ))}
                    </div>
                  )}
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

    </div>
  );
}
