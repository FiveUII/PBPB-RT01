"use client";
import { useState, useEffect, useRef } from "react";
import { createKegiatan, updateKegiatan, uploadFile } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormKegiatan({ initialData }: { initialData?: any }) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [existingGaleriUrls, setExistingGaleriUrls] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviewUrls, setNewGalleryPreviewUrls] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (formRef.current && initialData) {
      formRef.current.judul.value = initialData.judul;
      formRef.current.tanggal_pelaksanaan.value = initialData.tanggal_pelaksanaan;
      formRef.current.deskripsi_singkat.value = initialData.deskripsi_singkat;
      if (initialData.galeri_urls) {
        setExistingGaleriUrls(initialData.galeri_urls);
      }
      if (initialData.foto_url) {
        setPreviewUrl(initialData.foto_url);
      }
    } else if (formRef.current) {
      formRef.current.reset();
      setExistingGaleriUrls([]);
      setPreviewUrl(null);
    }
    setFile(null);
    setNewGalleryFiles([]);
    setNewGalleryPreviewUrls([]);
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
        fotoUrl = await uploadFile(file, "kegiatan");
      }
      
      let uploadedUrls: string[] = [];
      if (newGalleryFiles.length > 0) {
        uploadedUrls = await Promise.all(newGalleryFiles.map(f => uploadFile(f, "kegiatan"))) as string[];
      }
      
      const finalGaleriUrls = [...existingGaleriUrls, ...uploadedUrls];
      
      if (initialData) {
        formData.append("id", initialData.id);
        await updateKegiatan(formData, fotoUrl, finalGaleriUrls);
        await Swal.fire("Berhasil!", "Kegiatan berhasil diperbarui.", "success");
        router.push("/admin/dashboard/kegiatan");
      } else {
        await createKegiatan(formData, fotoUrl, finalGaleriUrls);
        form.reset();
        setFile(null);
        setNewGalleryFiles([]);
        setNewGalleryPreviewUrls([]);
        setExistingGaleriUrls([]);
        await Swal.fire("Berhasil!", "Kegiatan berhasil ditambahkan.", "success");
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
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Foto Utama (Thumbnail) {initialData && "(Opsional)"}
        </label>
        <div className="flex items-center gap-4">
          {previewUrl ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 flex-shrink-0 shadow-sm bg-white">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0 text-gray-400 text-2xl shadow-sm">
              📸
            </div>
          )}
          <div className="flex-1">
             <input type="file" id="foto_upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required={!initialData} className="hidden" />
             <label htmlFor="foto_upload" className="inline-block bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
               Pilih Foto
             </label>
             <p className="text-xs text-gray-400 mt-1 truncate max-w-[150px]">{file ? file.name : "Format JPG/PNG"}</p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Galeri Foto Tambahan (Bisa pilih banyak sekaligus)
        </label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0 text-gray-400 text-2xl shadow-sm">
            🖼️
          </div>
          <div className="flex-1">
            <input 
              type="file" 
              id="galeri_upload"
              accept="image/*" 
              multiple 
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  setNewGalleryFiles(prev => [...prev, ...files]);
                  const urls = files.map(f => URL.createObjectURL(f));
                  setNewGalleryPreviewUrls(prev => [...prev, ...urls]);
                }
              }} 
              className="hidden" 
            />
             <label htmlFor="galeri_upload" className="inline-block bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
               Pilih Beberapa Foto
             </label>
             <p className="text-xs text-gray-400 mt-1 truncate max-w-[200px]">{newGalleryFiles.length > 0 ? `${newGalleryFiles.length} file baru dipilih` : "Bisa lebih dari 1 foto"}</p>
          </div>
        </div>
        
        {(existingGaleriUrls.length > 0 || newGalleryPreviewUrls.length > 0) && (
           <div className="flex flex-wrap gap-2 mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
             {existingGaleriUrls.map((url, i) => (
               <div key={`exist-${i}`} className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-300 shadow-sm bg-white group">
                 <img src={url} alt={`existing ${i}`} className="w-full h-full object-cover" />
                 <button type="button" onClick={() => setExistingGaleriUrls(prev => prev.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                   ✕
                 </button>
               </div>
             ))}
             {newGalleryPreviewUrls.map((url, i) => (
               <div key={`new-${i}`} className="relative w-16 h-16 rounded-md overflow-hidden border border-blue-300 shadow-sm bg-white group">
                 <img src={url} alt={`new ${i}`} className="w-full h-full object-cover" />
                 <button type="button" onClick={() => {
                   setNewGalleryFiles(prev => prev.filter((_, idx) => idx !== i));
                   setNewGalleryPreviewUrls(prev => prev.filter((_, idx) => idx !== i));
                 }} className="absolute top-1 right-1 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
                   ✕
                 </button>
               </div>
             ))}
           </div>
        )}
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
