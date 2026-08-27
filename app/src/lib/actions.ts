"use server";

import { createClient } from "./supabase/server";
import { revalidatePath } from "next/cache";

// ==========================================
// PENGUMUMAN ACTIONS
// ==========================================
export async function getPengumuman() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pengumuman")
    .select("*")
    .order("tanggal", { ascending: false })
    .order("created_at", { ascending: false });
  
  if (error) console.error("Error fetching pengumuman:", error);
  return data || [];
}

export async function createPengumuman(formData: FormData) {
  const supabase = await createClient();
  
  const judul = formData.get("judul") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const tipe = formData.get("tipe") as string;

  const { error } = await supabase.from("pengumuman").insert({
    judul,
    deskripsi,
    tipe,
    tanggal: formData.get("tanggal"),
  });

  if (error) throw new Error(error.message);
  
  // Trigger Web Push Notification
  try {
    const payload = {
      title: `[${tipe}] ${judul}`,
      body: deskripsi.substring(0, 100) + (deskripsi.length > 100 ? "..." : "")
    };
    
    // We call the local API route directly to trigger the broadcast
    await fetch(process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/web-push` : "http://localhost:3000/api/web-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "broadcast", payload }),
    });
  } catch (err) {
    console.error("Gagal mengirim notifikasi:", err);
  }

  revalidatePath("/pengumuman");
  revalidatePath("/admin/dashboard/pengumuman");
  revalidatePath("/");
}

export async function deletePengumuman(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("pengumuman").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/pengumuman");
  revalidatePath("/admin/dashboard/pengumuman");
  revalidatePath("/");
}

export async function updatePengumuman(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("pengumuman").update({
    judul: formData.get("judul"),
    deskripsi: formData.get("deskripsi"),
    tipe: formData.get("tipe"),
    tanggal: formData.get("tanggal"),
  }).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/pengumuman");
  revalidatePath("/admin/dashboard/pengumuman");
  revalidatePath("/");
}

// ==========================================
// KEGIATAN ACTIONS
// ==========================================
export async function getKegiatan() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("kegiatan")
    .select("*")
    .order("tanggal_pelaksanaan", { ascending: false });
  
  if (error) console.error("Error fetching kegiatan:", error);
  return data || [];
}

export async function createKegiatan(formData: FormData, fotoUrl: string | null, galeriUrls: string[] = []) {
  const supabase = await createClient();
  const { error } = await supabase.from("kegiatan").insert({
    judul: formData.get("judul"),
    tanggal_pelaksanaan: formData.get("tanggal_pelaksanaan"),
    deskripsi_singkat: formData.get("deskripsi_singkat"),
    foto_url: fotoUrl,
    galeri_urls: galeriUrls,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/kegiatan");
  revalidatePath("/admin/dashboard/kegiatan");
}

export async function deleteKegiatan(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("kegiatan").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/kegiatan");
  revalidatePath("/admin/dashboard/kegiatan");
}

export async function updateKegiatan(formData: FormData, fotoUrl: string | null, galeriUrls: string[] | null = null) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  const updateData: any = {
    judul: formData.get("judul"),
    tanggal_pelaksanaan: formData.get("tanggal_pelaksanaan"),
    deskripsi_singkat: formData.get("deskripsi_singkat"),
  };
  
  if (fotoUrl) updateData.foto_url = fotoUrl;
  if (galeriUrls && galeriUrls.length > 0) updateData.galeri_urls = galeriUrls;

  const { error } = await supabase.from("kegiatan").update(updateData).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/kegiatan");
  revalidatePath("/admin/dashboard/kegiatan");
}

// ==========================================
// PENGURUS ACTIONS
// ==========================================
export async function getPengurus(kategori: string = "RT") {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("pengurus")
    .select("*")
    .eq("kategori", kategori)
    .order("urutan", { ascending: true });
  
  if (error) console.error("Error fetching pengurus:", error);
  return data || [];
}

export async function createPengurus(formData: FormData, fotoUrl: string | null) {
  const supabase = await createClient();
  const { error } = await supabase.from("pengurus").insert({
    nama: formData.get("nama"),
    jabatan: formData.get("jabatan"),
    no_telp: formData.get("no_telp"),
    kategori: formData.get("kategori"),
    urutan: parseInt(formData.get("urutan") as string) || 99,
    foto_url: fotoUrl,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/profil");
  revalidatePath("/badan-usaha/bioflok");
  revalidatePath("/badan-usaha/bank-sampah");
  revalidatePath("/admin/dashboard/pengurus");
}

export async function deletePengurus(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("pengurus").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/profil");
  revalidatePath("/badan-usaha/bioflok");
  revalidatePath("/badan-usaha/bank-sampah");
  revalidatePath("/admin/dashboard/pengurus");
}

export async function updatePengurus(formData: FormData, fotoUrl: string | null) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  const updateData: any = {
    nama: formData.get("nama"),
    jabatan: formData.get("jabatan"),
    no_telp: formData.get("no_telp"),
    kategori: formData.get("kategori"),
    urutan: parseInt(formData.get("urutan") as string) || 99,
  };
  
  if (fotoUrl) {
    updateData.foto_url = fotoUrl;
  } else if (formData.get("hapus_foto") === "true") {
    updateData.foto_url = null;
  }

  const { error } = await supabase.from("pengurus").update(updateData).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/profil");
  revalidatePath("/badan-usaha/bioflok");
  revalidatePath("/badan-usaha/bank-sampah");
  revalidatePath("/admin/dashboard/pengurus");
}

// ==========================================
// BADAN USAHA ACTIONS
// ==========================================
export async function getBadanUsaha() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("badan_usaha")
    .select("*")
    .order("nama_usaha", { ascending: true });
  
  if (error) console.error("Error fetching badan usaha:", error);
  return data || [];
}

export async function updateBadanUsaha(formData: FormData, fotoUrl: string | null = null, galeriUrls: string[] | null = null) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  const updateData: any = {
    nama_usaha: formData.get("nama_usaha"),
    deskripsi: formData.get("deskripsi"),
    jadwal_operasional: formData.get("jadwal_operasional"),
    kontak_whatsapp: formData.get("kontak_whatsapp"),
    label_tag: formData.get("label_tag") || null,
    updated_at: new Date().toISOString(),
  };
  
  if (fotoUrl) updateData.foto_url = fotoUrl;
  if (galeriUrls && galeriUrls.length > 0) updateData.galeri_urls = galeriUrls;

  const { error } = await supabase.from("badan_usaha").update(updateData).eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/badan-usaha");
  revalidatePath("/badan-usaha/bioflok");
  revalidatePath("/badan-usaha/bank-sampah");
  revalidatePath("/admin/dashboard/usaha");
}

// ==========================================
// STORAGE ACTIONS
// ==========================================
export async function uploadFile(file: File, folder: string): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("public-assets")
    .upload(fileName, file);

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from("public-assets")
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// ==========================================
// PROFIL RT ACTIONS
// ==========================================
export async function getProfilRT() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profil_rt")
    .select("*")
    .eq("id", 1)
    .single();
  
  if (error) {
    console.error("Error fetching profil RT:", error);
    return null;
  }
  return data;
}

export async function updateProfilRT(formData: FormData, galeriUrls: string[] | null = null) {
  const supabase = await createClient();
  
  const updateData: any = {
    deskripsi: formData.get("deskripsi"),
    visi: formData.get("visi"),
    misi: formData.get("misi"),
  };
  
  if (galeriUrls !== null) updateData.galeri_urls = galeriUrls;

  const { error } = await supabase.from("profil_rt").update(updateData).eq("id", 1);

  if (error) throw new Error(error.message);
  revalidatePath("/profil");
  revalidatePath("/admin/dashboard/pengurus");
}

// ==========================================
// STATISTIK KUNJUNGAN ACTIONS
// ==========================================
export async function trackVisit() {
  const supabase = await createClient();
  // Using RPC to safely increment the visit counter for today
  await supabase.rpc("catat_kunjungan");
}

export async function getStatistikKunjungan() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("statistik_kunjungan")
    .select("*")
    .order("tanggal", { ascending: true });
    
  if (error) {
    console.error("Error fetching stats:", error);
    return { total: 0, hariIni: 0, rataRata: 0, raw: [] };
  }
  
  if (!data || data.length === 0) {
    return { total: 0, hariIni: 0, rataRata: 0, raw: [] };
  }

  const total = data.reduce((sum, row) => sum + row.jumlah_pengunjung, 0);
  
  const today = new Date().toISOString().split('T')[0];
  const todayData = data.find(row => row.tanggal === today);
  const hariIni = todayData ? todayData.jumlah_pengunjung : 0;
  
  const rataRata = (total / data.length).toFixed(1);

  return { total, hariIni, rataRata: parseFloat(rataRata), raw: data };
}
