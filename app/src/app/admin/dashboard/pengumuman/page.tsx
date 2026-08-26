import { getPengumuman, deletePengumuman } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormPengumuman from "./FormPengumuman";
import { Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export const metadata = {
  title: "Kelola Pengumuman | Dashboard Admin",
};

export default async function AdminPengumumanPage(props: { searchParams: Promise<{ editId?: string }> }) {
  const searchParams = await props.searchParams;
  const pengumumanList = await getPengumuman();
  const editItem = pengumumanList.find((p: any) => p.id === searchParams.editId);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Kelola Pengumuman" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-6">
        
        {/* Form */}
        <section className="card p-5 max-w-2xl mx-auto w-full">
          <h2 className="section-title mb-4">{editItem ? "Edit Pengumuman" : "Buat Pengumuman Baru"}</h2>
          <FormPengumuman initialData={editItem} />
        </section>

        {/* List */}
        <section>
          <h2 className="section-title">Daftar Pengumuman</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pengumumanList.length === 0 ? (
              <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Belum ada pengumuman.</p>
            ) : (
              pengumumanList.map((item: any) => (
                <div key={item.id} className="card p-4 flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: "var(--text-dark)" }}>{item.judul}</h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {item.tipe} • {new Date(item.tanggal).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`?editId=${item.id}`} className="text-blue-600 bg-blue-50 p-1.5 rounded hover:bg-blue-100">
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton onDelete={async () => { "use server"; await deletePengumuman(item.id); }} itemName={item.judul} />
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: "var(--text-muted)" }}>{item.deskripsi}</p>
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
