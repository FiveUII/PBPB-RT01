"use client";
import { useState, useEffect } from "react";
import { updateProfilRT, uploadFile, uploadMultipleFiles } from "@/lib/actions";
import { compressImage } from "@/lib/compressImage";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FormProfil({ profil }: { profil: any }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Dynamic Misi
  const [misiList, setMisiList] = useState<string[]>([]);
  
  // Gallery State
  const [existingGaleriUrls, setExistingGaleriUrls] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviewUrls, setNewGalleryPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (profil) {
      if (profil.misi) {
        setMisiList(profil.misi.split("\n").filter((m: string) => m.trim() !== ""));
      } else {
        setMisiList([""]);
      }
      
      if (profil.galeri_urls) {
        setExistingGaleriUrls(profil.galeri_urls);
      }
    }
  }, [profil]);

  const handleMisiChange = (index: number, value: string) => {
    const newList = [...misiList];
    newList[index] = value;
    setMisiList(newList);
  };

  const handleAddMisi = () => {
    setMisiList([...misiList, ""]);
  };

  const handleRemoveMisi = (index: number) => {
    const newList = misiList.filter((_, i) => i !== index);
    setMisiList(newList.length > 0 ? newList : [""]); // Always keep at least one
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    
    const result = await Swal.fire({
      title: "Simpan Profil RT?",
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
    
    // Combine misiList into a newline-separated string
    const misiString = misiList.filter(m => m.trim() !== "").join("\n");
    formData.append("misi", misiString);

    try {
      let uploadedUrls: string[] = [];
      if (newGalleryFiles.length > 0) {
        const fd = new FormData();
        fd.append("folder", "profil");
        for (const f of newGalleryFiles) {
          const compressedFile = await compressImage(f);
          fd.append("files", compressedFile);
        }
        uploadedUrls = await uploadMultipleFiles(fd);
      }
      
      const finalGaleriUrls = [...existingGaleriUrls, ...uploadedUrls];

      await updateProfilRT(formData, finalGaleriUrls);
      await Swal.fire("Berhasil!", "Profil RT berhasil diperbarui.", "success");
      
      // Reset new gallery state
      setNewGalleryFiles([]);
      setNewGalleryPreviewUrls([]);
      
      router.refresh();
    } catch (err: any) {
      Swal.fire("Gagal", err.message || "Gagal menyimpan data.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Deskripsi RT</label>
        <textarea name="deskripsi" defaultValue={profil?.deskripsi || ""} required rows={4} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" placeholder="Tuliskan deksripsi RT..."></textarea>
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Visi</label>
        <textarea name="visi" defaultValue={profil?.visi || ""} required rows={3} className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" placeholder="Tuliskan visi..."></textarea>
      </div>
      
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Misi</label>
        <div className="flex flex-col gap-2">
          {misiList.map((misi, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-gray-400 font-bold text-sm w-4">{idx + 1}.</span>
              <input 
                type="text" 
                value={misi} 
                onChange={(e) => handleMisiChange(idx, e.target.value)}
                className="flex-1 rounded-lg px-3 py-2 text-sm border outline-none focus:border-[var(--green-800)]" 
                placeholder="Tuliskan poin misi..."
                required
              />
              <button 
                type="button" 
                onClick={() => handleRemoveMisi(idx)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                title="Hapus Misi"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={handleAddMisi}
            className="text-[var(--green-800)] border border-dashed border-[var(--green-800)] rounded-lg py-2 mt-1 text-sm font-semibold hover:bg-[var(--green-50)] transition-colors"
          >
            + Tambah Misi
          </button>
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>
          Galeri Foto Profil RT (Bisa pilih banyak sekaligus)
        </label>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 flex-shrink-0 text-gray-400 text-2xl shadow-sm">
            🖼️
          </div>
          <div className="flex-1">
            <input 
              type="file" 
              id="profil_galeri_upload"
              accept="image/*" 
              multiple 
              onChange={(e) => {
                if (e.target.files) {
                  const files = Array.from(e.target.files);
                  if (existingGaleriUrls.length + newGalleryFiles.length + files.length > 5) {
                    Swal.fire("Batas Maksimal", "Maksimal total 5 foto galeri yang diizinkan.", "warning");
                    return;
                  }
                  setNewGalleryFiles(prev => [...prev, ...files]);
                  const urls = files.map(f => URL.createObjectURL(f));
                  setNewGalleryPreviewUrls(prev => [...prev, ...urls]);
                }
              }} 
              className="hidden" 
            />
             <label htmlFor="profil_galeri_upload" className="inline-block bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm">
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

      <button type="submit" disabled={loading} className="btn-primary mt-4">
        {loading ? "Menyimpan..." : "Simpan Profil RT"}
      </button>
    </form>
  );
}
