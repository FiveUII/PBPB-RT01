import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";
import KegiatanClient from "./components/KegiatanClient";

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

        <KegiatanClient kegiatan={kegiatan} />

        {/* Load More */}
        {kegiatan.length > 0 && (
          <div className="mt-8 text-center">
            <button className="btn-outline w-full md:w-auto md:px-8">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </main>

      <Footer />

    </div>
  );
}
