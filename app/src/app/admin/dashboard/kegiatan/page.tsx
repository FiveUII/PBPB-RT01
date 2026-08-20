import { getKegiatan, deleteKegiatan } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormKegiatan from "./FormKegiatan";
import { Pencil, Trash2 } from "lucide-react";

export const metadata = {
  title: "Kelola Kegiatan | Dashboard Admin",
};

export default async function AdminKegiatanPage(props: { searchParams: Promise<{ editId?: string }> }) {
  const searchParams = await props.searchParams;
  const kegiatanList = await getKegiatan();
  const editItem = kegiatanList.find((k: any) => k.id === searchParams.editId);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Kelola Kegiatan" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-6">
        
        <section className="card p-5">
          <h2 className="section-title mb-4">{editItem ? "Edit Kegiatan" : "Tambah Kegiatan"}</h2>
          <FormKegiatan initialData={editItem} />
        </section>

        <section>
          <h2 className="section-title">Daftar Kegiatan</h2>
          <div className="flex flex-col gap-3">
            {kegiatanList.length === 0 ? (
              <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Belum ada data kegiatan.</p>
            ) : (
              kegiatanList.map((item: any) => (
                <div key={item.id} className="card p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: "var(--text-dark)" }}>{item.judul}</h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{item.tanggal_pelaksanaan}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`?editId=${item.id}`} className="text-blue-600 bg-blue-50 p-1.5 rounded hover:bg-blue-100">
                        <Pencil size={16} />
                      </Link>
                      <form action={async () => { "use server"; await deleteKegiatan(item.id); }}>
                        <button type="submit" className="text-red-600 bg-red-50 p-1.5 rounded hover:bg-red-100">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                  {item.foto_url && (
                    <img src={item.foto_url} alt={item.judul} className="w-full h-32 object-cover rounded-lg" />
                  )}
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.deskripsi_singkat}</p>
                </div>
              ))
            )}
          </div>
        </section>
        
        <Link href="/admin/dashboard" className="btn-outline text-center mt-4">
          Kembali ke Dashboard
        </Link>
      </main>
    </div>
  );
}
