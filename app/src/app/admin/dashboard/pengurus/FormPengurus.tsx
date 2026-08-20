"use client";
import { useState, useEffect, useRef } from "react";
import { createPengurus, updatePengurus, uploadFile } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function FormPengurus({ initialData }: { initialData?: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (formRef.current && initialData) {
      formRef.current.nama.value = initialData.nama;
      formRef.current.jabatan.value = initialData.jabatan;
      formRef.current.kategori.value = initialData.kategori;
      formRef.current.urutan.value = initialData.urutan;
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
        fotoUrl = await uploadFile(file, "pengurus");
      }
      
      if (initialData) {
        formData.append("id", initialData.id);
        await updatePengurus(formData, fotoUrl);
        alert("Pengurus berhasil diperbarui!");
        router.push("/admin/dashboard/pengurus");
      } else {
        await createPengurus(formData, fotoUrl);
        form.reset();
        setFile(null);
        alert("Pengurus berhasil ditambahkan!");
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
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Nama Lengkap</label>
        <input type="text" name="nama" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Jabatan</label>
          <input type="text" name="jabatan" required placeholder="Ketua RT 01" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Kategori</label>
          <select name="kategori" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]">
            <option value="RT">Pengurus RT</option>
            <option value="BANK_SAMPAH">Bank Sampah</option>
            <option value="BIOFLOK">Usaha Bioflok</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Urutan Tampil</label>
          <input type="number" name="urutan" defaultValue="99" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
            Foto Profil {initialData && "(Opsional)"}
          </label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required={!initialData} className="w-full text-sm mt-1" />
        </div>
      </div>
      
      <div className="flex gap-2 mt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Simpan Pengurus")}
        </button>
        {initialData && (
          <button type="button" onClick={() => router.push("/admin/dashboard/pengurus")} className="btn-outline">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
