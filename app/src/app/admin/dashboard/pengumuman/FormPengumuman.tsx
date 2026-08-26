"use client";
import { useState, useRef, useEffect } from "react";
import { createPengumuman, updatePengumuman } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormPengumuman({ initialData }: { initialData?: any }) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Populate form when initialData changes
  useEffect(() => {
    if (formRef.current && initialData) {
      formRef.current.judul.value = initialData.judul;
      formRef.current.deskripsi.value = initialData.deskripsi;
      formRef.current.tipe.value = initialData.tipe;
      formRef.current.tanggal.value = initialData.tanggal;
    } else if (formRef.current) {
      formRef.current.reset();
    }
  }, [initialData]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    
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

    try {
      const formData = new FormData(form);
      if (initialData) {
        formData.append("id", initialData.id);
        await updatePengumuman(formData);
        await Swal.fire("Berhasil!", "Pengumuman berhasil diperbarui.", "success");
        router.push("/admin/dashboard/pengumuman");
      } else {
        await createPengumuman(formData);
        await Swal.fire("Berhasil!", "Pengumuman berhasil dibuat.", "success");
        form.reset();
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
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Judul Pengumuman</label>
        <input type="text" name="judul" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Kategori</label>
          <select name="tipe" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]">
            <option value="INFO">INFO</option>
            <option value="PENTING">PENTING</option>
            <option value="JADWAL">JADWAL</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Tanggal</label>
          <input type="date" name="tanggal" required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Deskripsi</label>
        <textarea name="deskripsi" required rows={3} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]"></textarea>
      </div>
      
      <div className="flex gap-2 mt-2">
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? "Menyimpan..." : (initialData ? "Simpan Perubahan" : "Kirim Pengumuman")}
        </button>
        {initialData && (
          <button type="button" onClick={() => router.push("/admin/dashboard/pengumuman")} className="btn-outline">
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
