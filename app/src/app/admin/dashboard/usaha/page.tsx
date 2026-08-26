import { getBadanUsaha } from "@/lib/actions";
import Topbar from "@/components/Topbar";
import Link from "next/link";
import FormUsaha from "./FormUsaha";

export const metadata = {
  title: "Info Badan Usaha | Dashboard Admin",
};

export default async function AdminUsahaPage(props: { searchParams: Promise<{ tab?: string }> }) {
  const searchParams = await props.searchParams;
  const usahaList = await getBadanUsaha();

  if (usahaList.length === 0) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
        <Topbar title="Info Badan Usaha" showBack backHref="/admin/dashboard" />
        <main className="container-app py-6 flex-1 flex flex-col gap-6">
          <p className="text-sm italic text-center" style={{ color: "var(--text-muted)" }}>
            Belum ada data badan usaha. Pastikan Anda sudah menjalankan script SQL insert data.
          </p>
          <Link href="/admin/dashboard" className="btn-outline text-center mt-4">
            Kembali ke Dashboard
          </Link>
        </main>
      </div>
    );
  }

  // Determine active tab
  const activeTabId = searchParams.tab ? searchParams.tab : usahaList[0].id.toString();
  const activeUsaha = usahaList.find(u => u.id.toString() === activeTabId) || usahaList[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--surface)" }}>
      <Topbar title="Info Badan Usaha" showBack backHref="/admin/dashboard" />

      <main className="container-app py-6 flex-1 flex flex-col gap-5">
        
        {/* Tabs Navigation */}
        <div className="flex bg-white rounded-lg p-1.5 shadow-sm border border-gray-200">
          {usahaList.map(usaha => {
            const isActive = usaha.id.toString() === activeUsaha.id.toString();
            return (
              <Link 
                key={usaha.id}
                href={`?tab=${usaha.id}`}
                className={`flex-1 text-center py-2 px-3 rounded-md text-sm font-semibold transition-all ${isActive ? 'bg-[var(--green-800)] text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
              >
                {usaha.nama_usaha}
              </Link>
            )
          })}
        </div>
        
        <section key={activeUsaha.id} className="card p-5 fade-up max-w-2xl mx-auto w-full">
          <FormUsaha usaha={activeUsaha} />
        </section>
        
        <Link href="/admin/dashboard" className="btn-outline text-center mt-2 fade-up">
          Kembali ke Dashboard
        </Link>
      </main>
    </div>
  );
}
