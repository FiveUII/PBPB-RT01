"use client";
import { useState, useEffect } from "react";
import { updateBadanUsaha, uploadFile } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormUsaha({ usaha }: { usaha: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [existingGaleriUrls, setExistingGaleriUrls] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviewUrls, setNewGalleryPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (usaha) {
      if (usaha.galeri_urls) {
        setExistingGaleriUrls(usaha.galeri_urls);
      }
      if (usaha.foto_url) {
        setPreviewUrl(usaha.foto_url);
      }
    }
  }, [usaha]);

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (usaha?.foto_url) {
      setPreviewUrl(usaha.foto_url);
    } else {
      setPreviewUrl(null);
    }
  }, [file, usaha]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    
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

    setLoading(true);
    const formData = new FormData(form);
    formData.append("id", usaha.id);

    try {
      let fotoUrl = null;
      if (file) {
        fotoUrl = await uploadFile(file, "badan_usaha");
      }
      
      let uploadedUrls: string[] = [];
      if (newGalleryFiles.length > 0) {
        uploadedUrls = await Promise.all(newGalleryFiles.map(f => uploadFile(f, "badan_usaha"))) as string[];
      }
      
      const finalGaleriUrls = [...existingGaleriUrls, ...uploadedUrls];

      await updateBadanUsaha(formData, fotoUrl, finalGaleriUrls);
      await Swal.fire("Berhasil!", "Info badan usaha diperbarui.", "success");
      router.push("/admin/dashboard/usaha");
    } catch (err: any) {
      Swal.fire("Gagal", err.message || "Gagal menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Nama Usaha</label>
        <input type="text" name="nama_usaha" defaultValue={usaha.nama_usaha} required className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Deskripsi Usaha</label>
        <textarea name="deskripsi" defaultValue={usaha.deskripsi || ""} required rows={3} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]"></textarea>
      </div>
      
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Lokasi Usaha</label>
        <input type="text" name="lokasi" defaultValue={usaha.lokasi || ""} placeholder="Contoh: Area Fasum RT, Blok F" className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" />
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
      
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Foto Utama (Thumbnail) (Opsional)
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
             <input type="file" id="foto_upload" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="hidden" />
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

      <button type="submit" disabled={loading} className="btn-primary mt-2">
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
