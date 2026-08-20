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

export async function createKegiatan(formData: FormData, fotoUrl: string | null) {
  const supabase = await createClient();
  const { error } = await supabase.from("kegiatan").insert({
    judul: formData.get("judul"),
    tanggal_pelaksanaan: formData.get("tanggal_pelaksanaan"),
    deskripsi_singkat: formData.get("deskripsi_singkat"),
    foto_url: fotoUrl,
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

export async function updateKegiatan(formData: FormData, fotoUrl: string | null) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  const updateData: any = {
    judul: formData.get("judul"),
    tanggal_pelaksanaan: formData.get("tanggal_pelaksanaan"),
    deskripsi_singkat: formData.get("deskripsi_singkat"),
  };
  
  if (fotoUrl) updateData.foto_url = fotoUrl;

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
    kategori: formData.get("kategori"),
    urutan: parseInt(formData.get("urutan") as string) || 99,
  };
  
  if (fotoUrl) updateData.foto_url = fotoUrl;

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

export async function updateBadanUsaha(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const { error } = await supabase
    .from("badan_usaha")
    .update({
      deskripsi: formData.get("deskripsi"),
      jadwal_operasional: formData.get("jadwal_operasional"),
      kontak_whatsapp: formData.get("kontak_whatsapp"),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

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
