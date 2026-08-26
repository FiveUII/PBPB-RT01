import { getPengurus, deletePengurus, getProfilRT } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormPengurus from "./FormPengurus";
import FormProfil from "./FormProfil";
import { Pencil } from "lucide-react";
import DeleteButton from "@/components/DeleteButton";

export const metadata = {
  title: "Kelola Pengurus | Dashboard Admin",
};

const PengurusGroup = ({ title, list, currentFilter }: { title: string, list: any[], currentFilter: string }) => {
  if (list.length === 0) return (
    <p className="text-sm italic text-gray-500 py-4 text-center">Belum ada data pengurus di kategori ini.</p>
  );
  return (
    <div>
      <div className="flex flex-col gap-3">
        {list.map((item: any) => (
          <div key={item.id} className="card p-4 flex items-center gap-3">
            {item.foto_url ? (
              <img src={item.foto_url} alt={item.nama} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">👤</div>
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm truncate" style={{ color: "var(--text-dark)" }}>{item.nama}</h3>
              <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.jabatan}</p>
            </div>
            
            <div className="flex gap-2">
              <Link href={`?tab=pengurus&editId=${item.id}&filter=${currentFilter}`} className="text-blue-600 bg-blue-50 p-2 rounded hover:bg-blue-100">
                <Pencil size={16} />
              </Link>
              <DeleteButton onDelete={async () => { "use server"; await deletePengurus(item.id); }} itemName={item.nama} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default async function AdminPengurusPage(props: { searchParams: Promise<{ editId?: string, tab?: string, filter?: string }> }) {
  const searchParams = await props.searchParams;
  const pengurusListRT = await getPengurus("RT");
  const pengurusListBioflok = await getPengurus("BIOFLOK");
  const pengurusListBankSampah = await getPengurus("BANK_SAMPAH");
  const allPengurus = [...pengurusListRT, ...pengurusListBioflok, ...pengurusListBankSampah];
  const editItem = allPengurus.find((p: any) => p.id === searchParams.editId);
  const profilRT = await getProfilRT();

  // If editId is present, automatically switch to pengurus tab
  const activeTab = searchParams.editId ? "pengurus" : (searchParams.tab === "profil" ? "profil" : "pengurus");
  const activeFilter = searchParams.filter || "RT";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Kelola Pengurus" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-5">
        
        {/* Tabs Navigation */}
        <div className="flex bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
          <Link 
            href="?tab=pengurus"
            className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-semibold transition-all ${activeTab === "pengurus" ? 'bg-[var(--green-800)] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            Daftar Pengurus
          </Link>
          <Link 
            href="?tab=profil"
            className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-semibold transition-all ${activeTab === "profil" ? 'bg-[var(--green-800)] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
          >
            Profil RT
          </Link>
        </div>

        {activeTab === "profil" ? (
          <section className="card p-5 fade-up max-w-2xl mx-auto w-full">
            <h2 className="section-title mb-4">Pengaturan Profil RT</h2>
            <FormProfil profil={profilRT} />
          </section>
        ) : (
          <div className="flex flex-col gap-5 fade-up">
            <section className="card p-5 max-w-2xl mx-auto w-full">
              <h2 className="section-title mb-4">{editItem ? "Edit Pengurus" : "Tambah Pengurus"}</h2>
              <FormPengurus initialData={editItem} />
            </section>

            <section>
              <h2 className="section-title mb-3">Daftar Pengurus</h2>
              
              <div className="flex bg-gray-100 p-1 rounded-lg mb-4 overflow-x-auto hide-scrollbar">
                <Link href="?tab=pengurus&filter=RT" className={`flex-1 text-center px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${activeFilter === "RT" ? "bg-white shadow-sm text-[var(--green-800)]" : "text-gray-500"}`}>RT</Link>
                <Link href="?tab=pengurus&filter=BIOFLOK" className={`flex-1 text-center px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${activeFilter === "BIOFLOK" ? "bg-white shadow-sm text-[var(--green-800)]" : "text-gray-500"}`}>Bioflok</Link>
                <Link href="?tab=pengurus&filter=BANK_SAMPAH" className={`flex-1 text-center px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${activeFilter === "BANK_SAMPAH" ? "bg-white shadow-sm text-[var(--green-800)]" : "text-gray-500"}`}>Bank Sampah</Link>
              </div>

              <div className="flex flex-col gap-6">
                {activeFilter === "RT" && <PengurusGroup title="Pengurus Utama (RT)" list={pengurusListRT} currentFilter={activeFilter} />}
                {activeFilter === "BIOFLOK" && <PengurusGroup title="Ternak Ikan Bioflok" list={pengurusListBioflok} currentFilter={activeFilter} />}
                {activeFilter === "BANK_SAMPAH" && <PengurusGroup title="Bank Sampah" list={pengurusListBankSampah} currentFilter={activeFilter} />}
              </div>
            </section>
          </div>
        )}
        
        <Link href="/admin/dashboard" className="btn-outline text-center mt-2 fade-up">
          Kembali ke Dashboard
        </Link>
      </main>
    </div>
  );
}
