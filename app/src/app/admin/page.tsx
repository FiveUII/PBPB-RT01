import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login Admin | RT 01 Perumahan Bukit Pinang Bahari",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden bg-[#f4f6f8]">
      {/* Background SVG Waves */}
      <svg className="absolute top-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" style={{ height: 'clamp(100px, 15vh, 200px)' }}>
        <path fill="#e11d48" d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,64C672,75,768,117,864,122.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        <path fill="#be123c" fillOpacity="0.4" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,42.7C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
      </svg>
      <svg className="absolute bottom-0 left-0 w-full z-0" viewBox="0 0 1440 320" fill="none" preserveAspectRatio="none" style={{ height: 'clamp(100px, 15vh, 200px)', transform: 'rotate(180deg)' }}>
        <path fill="#e11d48" d="M0,0L48,16C96,32,192,64,288,69.3C384,75,480,53,576,64C672,75,768,117,864,122.7C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
        <path fill="#be123c" fillOpacity="0.2" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z" />
      </svg>
      <div className="absolute inset-0 z-0 opacity-[0.2] pointer-events-none mix-blend-multiply" style={{
        backgroundImage: 'radial-gradient(#e11d48 2px, transparent 2px), radial-gradient(#d4a017 2px, transparent 2px)',
        backgroundSize: '40px 40px, 24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }} />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 drop-shadow-md">🏘️</div>
          <h1 className="text-2xl font-extrabold text-gray-800 uppercase tracking-wide">Panel Admin RT</h1>
          <p className="text-gray-500 font-semibold text-sm mt-1">Perumahan Bukit Pinang Bahari</p>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-[0_12px_32px_rgba(27,67,50,0.14)] border border-white/50 p-6">
          <h2 className="font-bold text-lg mb-5 text-center text-red-700 uppercase tracking-wider">
            Masuk Pengurus
          </h2>
          <LoginForm />
        </div>

        <p className="text-center text-gray-400 font-medium text-xs mt-6">
          Akses terbatas hanya untuk pengurus RT yang terdaftar.
        </p>
      </div>
    </div>
  );
}
