"use client";
import { useState, useEffect, useRef } from "react";
import { createPengurus, updatePengurus, uploadFile } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormPengurus({ initialData }: { initialData?: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      setPreviewUrl(null);
    }
    setFile(null);
  }, [initialData]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (initialData?.foto_url) {
      setPreviewUrl(initialData.foto_url);
    } else {
      setPreviewUrl(null);
    }
  }, [file, initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (initialData) {
      const result = await Swal.fire({
        title: "Simpan Perubahan?",
        text: "Pastikan data yang diubah sudah benar.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#16a34a",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Ya, Simpan",
        cancelButtonText: "Batal",
        reverseButtons: true,
      });
      if (!result.isConfirmed) return;
    }

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
        await Swal.fire("Berhasil!", "Data pengurus diperbarui.", "success");
        router.push("/admin/dashboard/pengurus");
      } else {
        await createPengurus(formData, fotoUrl);
        form.reset();
        setFile(null);
        setPreviewUrl(null);
        await Swal.fire("Berhasil!", "Pengurus ditambahkan.", "success");
      }
    } catch (err: any) {
      Swal.fire("Gagal", err.message || "Gagal menyimpan data.", "error");
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
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Urutan Tampil</label>
        <input type="number" name="urutan" defaultValue="99" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Foto Profil (Opsional)
        </label>
        <div className="flex items-center gap-4">
          {previewUrl ? (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0 shadow-sm bg-white">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0 text-gray-400 text-2xl shadow-sm">
              📸
            </div>
          )}
          <div className="flex-1">
             <input type="file" id="foto_upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
             <label htmlFor="foto_upload" className="inline-block bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
               Pilih Foto
             </label>
             <p className="text-xs text-gray-400 mt-1 truncate max-w-[150px]">{file ? file.name : "Maks 2MB"}</p>
          </div>
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
