import { Eye, Clock, TrendingUp } from "lucide-react";

interface StatistikWidgetProps {
  total: number;
  hariIni: number;
  rataRata: number;
  variant?: "public" | "admin";
}

export default function StatistikWidget({ total, hariIni, rataRata, variant = "public" }: StatistikWidgetProps) {
  
  // Format numbers nicely
  const formatNum = (num: number) => new Intl.NumberFormat('id-ID').format(num);

  if (variant === "public") {
    // Simplified version for homepage
    return (
      <div className="rounded-2xl p-6 w-full max-w-2xl mx-auto shadow-xl text-white" style={{ background: "var(--green-900)" }}>
        <h3 className="text-center text-xs tracking-widest text-amber-300 uppercase font-bold mb-2">Analitik Website</h3>
        <h2 className="text-center text-2xl font-bold mb-6">Statistik Pengunjung</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl p-5 border border-white/10 flex flex-col items-center text-center" style={{ background: "rgba(0,0,0,0.2)" }}>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 mb-3">
              <Eye size={20} />
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-1">Total Kunjungan</p>
            <p className="text-3xl font-black">{formatNum(total)}</p>
          </div>
          
          <div className="rounded-xl p-5 border border-white/10 flex flex-col items-center text-center" style={{ background: "rgba(0,0,0,0.2)" }}>
            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 mb-3">
              <Clock size={20} />
            </div>
            <p className="text-[10px] text-emerald-100/70 uppercase tracking-widest font-semibold mb-1">Hari Ini</p>
            <p className="text-3xl font-black text-amber-300">{formatNum(hariIni)}</p>
          </div>
        </div>
      </div>
    );
  }

  // Full version for admin
  return (
    <div className="rounded-2xl p-6 md:p-8 w-full shadow-xl text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--green-900), var(--green-800))" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="mb-6 relative z-10">
        <h3 className="text-[11px] tracking-widest text-amber-300 uppercase font-bold mb-1">Analitik Website</h3>
        <h2 className="text-2xl md:text-3xl font-bold">Statistik Pengunjung</h2>
        <p className="text-xs text-emerald-100/70 mt-1">Data lalu lintas kunjungan portal RT 01</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Total Card */}
        <div className="rounded-xl p-5 border border-white/10 flex flex-col justify-between" style={{ background: "rgba(0,0,0,0.2)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-emerald-100/70 uppercase tracking-widest font-semibold">Total Kunjungan</p>
              <p className="text-[9px] text-emerald-200/50 mt-0.5">Sejak website diluncurkan</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
              <Eye size={18} />
            </div>
          </div>
          <div>
            <p className="text-4xl font-black">{formatNum(total)}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold">
              <span>Kunjungan Unik</span>
            </div>
          </div>
        </div>
        
        {/* Today Card */}
        <div className="rounded-xl p-5 border border-white/10 flex flex-col justify-between" style={{ background: "rgba(0,0,0,0.2)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-emerald-100/70 uppercase tracking-widest font-semibold">Hari Ini</p>
              <p className="text-[9px] text-emerald-200/50 mt-0.5">Statistik Real-time</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
              <Clock size={18} />
            </div>
          </div>
          <div>
            <p className="text-4xl font-black text-amber-300">{formatNum(hariIni)}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-500/20 text-amber-200 text-[10px] font-semibold">
              <span>Pengunjung Aktif</span>
            </div>
          </div>
        </div>
        
        {/* Average Card */}
        <div className="rounded-xl p-5 border border-white/10 flex flex-col justify-between" style={{ background: "rgba(0,0,0,0.2)" }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-emerald-100/70 uppercase tracking-widest font-semibold">Rata-rata Harian</p>
              <p className="text-[9px] text-emerald-200/50 mt-0.5">Performa Kunjungan</p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300">
              <TrendingUp size={18} />
            </div>
          </div>
          <div>
            <p className="text-4xl font-black">{rataRata}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-teal-500/20 text-teal-200 text-[10px] font-semibold">
              <span>Kunjungan / Hari</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
