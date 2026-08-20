"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-medium" style={{ background: "#fee2e2", color: "#991b1b" }}>
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>
          Email Pengurus
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pengurus@rt01harmoni.com"
          required
          className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-colors"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--green-800)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-muted)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full rounded-xl px-4 py-3 text-sm border outline-none transition-colors"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-dark)" }}
          onFocus={(e) => (e.target.style.borderColor = "var(--green-800)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-2"
        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
      >
        {loading ? "Memproses..." : "Masuk ke Dashboard"}
      </button>
    </form>
  );
}
