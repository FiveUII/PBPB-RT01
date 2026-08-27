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

  // Full version for admin (Compact 1-row design)
  return (
    <div className="rounded-2xl p-4 md:p-5 shadow-sm text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--green-900), var(--green-800))" }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Title side */}
        <div>
          <h3 className="text-[10px] tracking-widest text-amber-300 uppercase font-bold mb-0.5">Analitik</h3>
          <h2 className="text-sm font-semibold">Statistik Pengunjung</h2>
        </div>

        {/* Stats side (1 row) */}
        <div className="flex items-center justify-between md:justify-end gap-4 md:gap-8 bg-black/10 rounded-xl p-3 md:bg-transparent md:p-0">
          
          {/* Total */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Eye size={12} className="text-emerald-300" />
              <p className="text-[9px] text-emerald-100/70 uppercase tracking-widest font-semibold">Total</p>
            </div>
            <p className="text-lg md:text-xl font-bold leading-none">{formatNum(total)}</p>
          </div>
          
          <div className="w-px h-8 bg-white/10"></div>
          
          {/* Hari Ini */}
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Clock size={12} className="text-amber-300" />
              <p className="text-[9px] text-amber-100/70 uppercase tracking-widest font-semibold">Hari Ini</p>
            </div>
            <p className="text-lg md:text-xl font-bold leading-none text-amber-300">{formatNum(hariIni)}</p>
          </div>

          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          
          {/* Average */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1.5 mb-0.5">
              <TrendingUp size={12} className="text-teal-300" />
              <p className="text-[9px] text-teal-100/70 uppercase tracking-widest font-semibold">Rata-rata</p>
            </div>
            <p className="text-lg md:text-xl font-bold leading-none text-teal-300">{rataRata}</p>
          </div>

        </div>
      </div>
    </div>
  );
}
