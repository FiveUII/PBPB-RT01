import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login Admin | RT 01 Perumahan Harmoni",
};

export default function AdminLoginPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      style={{ background: "linear-gradient(160deg, var(--green-900), var(--green-800))" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏘️</div>
          <h1 className="text-2xl font-extrabold text-white">Panel Admin RT</h1>
          <p className="text-white/60 text-sm mt-1">RT 01 Perumahan Harmoni</p>
        </div>

        {/* Form */}
        <div className="card p-6">
          <h2 className="font-bold text-lg mb-5" style={{ color: "var(--text-dark)" }}>
            Masuk sebagai Pengurus
          </h2>
          <LoginForm />
        </div>

        <p className="text-center text-white/40 text-xs mt-5">
          Akses terbatas hanya untuk pengurus RT yang terdaftar.
        </p>
      </div>
    </div>
  );
}
