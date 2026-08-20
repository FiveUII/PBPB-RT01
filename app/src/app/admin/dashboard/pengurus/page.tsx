import { getPengurus, deletePengurus } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormPengurus from "./FormPengurus";
import { Pencil, Trash2 } from "lucide-react";

export const metadata = {
  title: "Kelola Pengurus | Dashboard Admin",
};

export default async function AdminPengurusPage(props: { searchParams: Promise<{ editId?: string }> }) {
  const searchParams = await props.searchParams;
  const pengurusListRT = await getPengurus("RT");
  const pengurusListBioflok = await getPengurus("BIOFLOK");
  const pengurusListBankSampah = await getPengurus("BANK_SAMPAH");
  const allPengurus = [...pengurusListRT, ...pengurusListBioflok, ...pengurusListBankSampah];
  const editItem = allPengurus.find((p: any) => p.id === searchParams.editId);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Kelola Pengurus" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-6">
        
        <section className="card p-5">
          <h2 className="section-title mb-4">{editItem ? "Edit Pengurus" : "Tambah Pengurus"}</h2>
          <FormPengurus initialData={editItem} />
        </section>

        <section>
          <h2 className="section-title">Daftar Pengurus</h2>
          <div className="flex flex-col gap-3">
            {allPengurus.length === 0 ? (
              <p className="text-sm italic" style={{ color: "var(--text-muted)" }}>Belum ada data pengurus.</p>
            ) : (
              allPengurus.map((item: any) => (
                <div key={item.id} className="card p-4 flex items-center gap-3">
                  {item.foto_url ? (
                    <img src={item.foto_url} alt={item.nama} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">👤</div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate" style={{ color: "var(--text-dark)" }}>{item.nama}</h3>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.jabatan} • {item.kategori}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`?editId=${item.id}`} className="text-blue-600 bg-blue-50 p-2 rounded hover:bg-blue-100">
                      <Pencil size={16} />
                    </Link>
                    <form action={async () => { "use server"; await deletePengurus(item.id); }}>
                      <button type="submit" className="text-red-600 bg-red-50 p-2 rounded hover:bg-red-100">
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
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
