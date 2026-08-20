import { getBadanUsaha } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormUsaha from "./FormUsaha";

export const metadata = {
  title: "Info Badan Usaha | Dashboard Admin",
};

export default async function AdminUsahaPage() {
  const usahaList = await getBadanUsaha();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Info Badan Usaha" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-6">
        
        {usahaList.length === 0 ? (
          <p className="text-sm italic text-center" style={{ color: "var(--text-muted)" }}>
            Belum ada data badan usaha. Pastikan Anda sudah menjalankan script SQL insert data.
          </p>
        ) : (
          usahaList.map((usaha) => (
            <section key={usaha.id} className="card p-5">
              <h2 className="section-title mb-4">Edit: {usaha.nama_usaha}</h2>
              <FormUsaha usaha={usaha} />
            </section>
          ))
        )}
        
        <Link href="/admin/dashboard" className="btn-outline text-center mt-4">
          Kembali ke Dashboard
        </Link>
      </main>
    </div>
  );
}
