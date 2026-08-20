"use client";
import { useState } from "react";
import { updateBadanUsaha } from "@/lib/actions";

export default function FormUsaha({ usaha }: { usaha: any }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("id", usaha.id);
      
      await updateBadanUsaha(formData);
      alert("Informasi berhasil diperbarui!");
    } catch (err: any) {
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Nama Usaha</label>
        <input type="text" value={usaha.nama_usaha} disabled className="w-full rounded-lg px-3 py-2 text-sm border bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Deskripsi Usaha</label>
        <textarea name="deskripsi" defaultValue={usaha.deskripsi || ""} required rows={3} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]"></textarea>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Jadwal Operasional</label>
          <input type="text" name="jadwal_operasional" defaultValue={usaha.jadwal_operasional || ""} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Kontak WhatsApp</label>
          <input type="text" name="kontak_whatsapp" defaultValue={usaha.kontak_whatsapp || ""} placeholder="Contoh: 0812-XXXX-XXXX" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
        </div>
      </div>
      
      <button type="submit" disabled={loading} className="btn-primary mt-2">
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
