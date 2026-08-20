"use client";
import { useState, useEffect, useRef } from "react";
import { createKegiatan, updateKegiatan, uploadFile } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function FormKegiatan({ initialData }: { initialData?: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (formRef.current && initialData) {
      formRef.current.judul.value = initialData.judul;
      formRef.current.tanggal_pelaksanaan.value = initialData.tanggal_pelaksanaan;
      formRef.current.deskripsi_singkat.value = initialData.deskripsi_singkat;
    } else if (formRef.current) {
      formRef.current.reset();
    }
    setFile(null);
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    try {
      const formData = new FormData(form);
      
      let fotoUrl = null;
      if (file) {
        fotoUrl = await uploadFile(file, "kegiatan");
      }
      
      if (initialData) {
        formData.append("id", initialData.id);
        await updateKegiatan(formData, fotoUrl);
        alert("Kegiatan berhasil diperbarui!");
        router.push("/admin/dashboard/kegiatan");
      } else {
        await createKegiatan(formData, fotoUrl);
        form.reset();
        setFile(null);
        alert("Kegiatan berhasil ditambahkan!");
      }
    } catch (err: any) {
      alert("Gagal: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Judul Kegiatan</label>
        <input type="text" name="judul" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Tanggal Pelaksanaan</label>
        <input type="date" name="tanggal_pelaksanaan" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Deskripsi Singkat</label>
        <textarea name="deskripsi_singkat" required rows={3} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]"></textarea>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
          Foto Kegiatan {initialData && "(Kosongkan jika tidak ingin mengubah foto)"}
        </label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required={!initialData} className="w-full text-sm" />
      </div>
      
      <div className="flex gap-2 mt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Simpan Kegiatan")}
        </button>
        {initialData && (
          <button type="button" onClick={() => router.push("/admin/dashboard/kegiatan")} className="btn-outline">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
