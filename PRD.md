# Product Requirements Document (PRD)
**Project Name:** Website Profil Perumahan RT
**Version:** 1.2
**Date:** 20 Agustus 2026
**Status:** ✅ Disetujui — Siap untuk Implementasi

> **Changelog v1.2:** Ditambahkan fitur Pengumuman, Push Notifications (Web Push API), dan PWA (Progressive Web App) untuk pengalaman mobile pengurus RT.

---

## 1. Project Overview

**Tujuan (Objective):**
Membangun platform informasi digital berbasis web yang komprehensif untuk warga perumahan di tingkat RT. Website ini berfungsi sebagai pusat informasi warga, sarana transparansi, dokumentasi kegiatan lingkungan, serta etalase digital untuk unit-unit Badan Usaha Milik RT (BUMRT).

**Target Pengguna (Target Audience):**
- **Warga Perumahan:** Untuk mendapatkan informasi terkini, melihat kegiatan, dan layanan badan usaha RT.
- **Pengurus RT:** Sebagai admin yang mengelola konten website melalui halaman `/admin` tanpa menyentuh kode.
- **Masyarakat Umum / Pihak Eksternal:** Untuk melihat profil lingkungan dan potensi usaha warga.

---

## 2. Tech Stack & Arsitektur Sistem

Keputusan ini telah dikonfirmasi pada sesi 20 Agustus 2026.

| Komponen | Teknologi | Keterangan |
|---|---|---|
| **Frontend** | Next.js (React) | Framework utama untuk semua halaman publik dan admin |
| **Database** | Supabase (PostgreSQL) | Menyimpan data pengurus, kegiatan, dan badan usaha |
| **File Storage** | Supabase Storage | Menyimpan foto pengurus dan foto kegiatan |
| **Autentikasi Admin** | Supabase Auth | Sistem login email & password untuk pengurus RT |
| **Admin Panel** | Halaman `/admin` (Next.js) | Antarmuka pengelolaan konten khusus pengurus, tanpa coding |
| **Hosting** | Vercel | Deploy otomatis dari repository GitHub |
| **Domain (Fase 1)** | Subdomain Vercel gratis | Contoh: `profilrt.vercel.app` |
| **Domain (Fase 2)** | Domain berbayar | Migrasi ke domain kustom di masa mendatang |
| **PWA** | next-pwa / Service Worker | Installable di HP pengurus, mendukung push notification |
| **Push Notification** | Web Push API + Supabase | Notifikasi pengumuman ke warga yang subscribe |

**Total Biaya Operasional Awal: Rp 0**

### Alur Arsitektur Sistem:
```
Pengguna Publik                 Pengurus RT (Admin)
     |                                |
     v                                v
Halaman Publik              Halaman /admin (login)
(/profil, /kegiatan,             |
 /badan-usaha, dsb.)             v
     |                    Form tambah/edit konten
     |                            |
     +---------> Supabase (Database + Storage) <--------+
                  (Sumber data tunggal / Single Source of Truth)
```

---

## 3. User Flow (Alur Pengguna)

### 3.1 Alur Pengguna Publik
1. **Landing Page:** Pengguna mengakses URL website, disambut hero section dan 3 kartu navigasi utama.
2. **Navigasi Utama:**
   - **Alur A (Profil):** Klik kartu "Profil" ➔ Halaman Profil ➔ lihat deskripsi RT, susunan pengurus, dan Google Maps.
   - **Alur B (Kegiatan):** Klik kartu "Kegiatan" ➔ Halaman Kegiatan ➔ lihat feed/galeri dokumentasi acara.
   - **Alur C (Badan Usaha):** Klik kartu "Badan Usaha" ➔ Halaman Hub Badan Usaha.
   - **Alur D (Pengumuman):** Klik banner/tombol "Pengumuman" ➔ Halaman Pengumuman ➔ lihat daftar pengumuman terbaru.
3. **Navigasi Sub-Usaha (dari Alur C):**
   - Klik **Ternak Ikan Bioflok** ➔ Sub-page Bioflok.
   - Klik **Bank Sampah** ➔ Sub-page Bank Sampah.
4. **Tombol WhatsApp:** Tersedia di seluruh halaman (floating button) untuk langsung menghubungi pengurus RT.
5. **Tombol Notifikasi:** Tersedia di halaman Landing Page dan Pengumuman. Klik "Dapatkan Notifikasi" ➔ browser meminta izin ➔ warga berlangganan push notification. Setiap kali admin memposting pengumuman baru, notifikasi dikirim otomatis.

### 3.2 Alur Pengurus RT (Admin)
1. Pengurus mengakses `[domain]/admin`.
2. Login menggunakan email dan password yang telah didaftarkan.
3. Setelah masuk, tersedia dashboard dengan menu:
   - **Kelola Kegiatan:** Tambah, edit, dan hapus entri kegiatan beserta foto.
   - **Kelola Pengurus:** Tambah, edit, dan hapus data pengurus RT beserta foto.
   - **Kelola Badan Usaha:** Edit informasi dan pengurus untuk unit Bioflok dan Bank Sampah.
   - **Kelola Pengumuman:** Tulis dan kirim pengumuman baru, yang secara otomatis men-trigger push notification ke semua warga subscriber.
4. Setiap perubahan langsung tampil di website publik secara real-time.
5. **Pengurus menggunakan PWA:** Website bisa diinstal ke home screen HP pengurus. Notifikasi masuk dari warga atau sistem dapat diterima seperti aplikasi native.

---

## 4. Functional Requirements (Kebutuhan Fungsional)

### 4.1. Landing Page Utama
- **Hero Section:** Menampilkan visual menarik dengan ucapan selamat datang.
- **Navigasi Pusat:** 3 Kartu interaktif menuju halaman Profil RT, Kegiatan Warga, dan Badan Usaha RT.
- **Tombol WhatsApp Floating:** Tombol tetap di sudut bawah layar yang langsung mengarah ke WhatsApp nomor pengurus RT.
- **Footer:** Informasi singkat RT dan tautan sosial media (jika ada).

### 4.2. Halaman Profil
- **Deskripsi Lingkungan:** Paragraf profil, visi-misi, atau nilai-nilai lingkungan RT.
- **Struktur Organisasi:** Grid kartu pengurus, masing-masing menampilkan Foto, Nama Lengkap, dan Jabatan.
- **Lokasi Peta:** Embed Google Maps menunjukkan lokasi perumahan/balai warga.

### 4.3. Halaman Kegiatan
- **Feed Dokumentasi:** Daftar kegiatan diurutkan dari terbaru (kronologis turun).
- **Elemen per Kegiatan:** Foto Thumbnail, Judul, Tanggal Pelaksanaan, dan Deskripsi Singkat.
- **Pagination / Load More:** Tampil 9 kegiatan per halaman untuk menjaga performa.

### 4.4. Halaman Badan Usaha (Hub)
- **Deskripsi Singkat:** Pengantar program pemberdayaan ekonomi warga RT.
- **Menu Unit Usaha:** 2 kartu navigasi menuju sub-page Ternak Ikan Bioflok dan Bank Sampah.

### 4.5. Sub-Page Unit Usaha (Bioflok & Bank Sampah)
- **Hero Usaha:** Nama dan foto/logo unit usaha.
- **Deskripsi Usaha:** Latar belakang, cara kerja, layanan, atau produk yang dihasilkan.
- **Susunan Pengurus Usaha:** Grid pengurus spesifik unit tersebut (Foto, Nama, Jabatan).
- **Informasi Relevan:** Jadwal operasional, kontak WhatsApp, dan informasi tambahan lainnya.

### 4.6. Halaman Admin (`/admin`) — Khusus Pengurus RT
- **Autentikasi:** Halaman login dengan email & password. Hanya pengurus terdaftar yang bisa masuk.
- **Dashboard Kelola Kegiatan:** Form tambah/edit kegiatan (judul, tanggal, foto upload, deskripsi), dengan daftar kegiatan yang bisa dihapus.
- **Dashboard Kelola Pengurus:** Form tambah/edit pengurus (nama, jabatan, foto upload, kategori unit), dengan daftar pengurus yang bisa dihapus.
- **Dashboard Kelola Info Badan Usaha:** Form edit deskripsi dan jadwal operasional untuk masing-masing unit usaha.

---

## 5. Non-Functional Requirements (Kebutuhan Non-Fungsional)

- **Mobile Responsiveness:** Desain *mobile-first*. Semua elemen (kartu, grid foto, teks) menyesuaikan ukuran layar, stacking vertikal di layar kecil.
- **Performance:** Menggunakan fitur `next/image` untuk optimasi gambar otomatis. Target waktu muat di bawah 3 detik.
- **Usability & Accessibility:** UI bersih, font mudah dibaca, rasio kontras tinggi, ramah untuk semua usia termasuk lansia.
- **Maintainability:** Seluruh pengelolaan konten dilakukan melalui halaman `/admin`. Pengurus RT **tidak perlu menyentuh kode sama sekali**.
- **Keamanan Admin:** Halaman `/admin` hanya dapat diakses setelah login. Semua request ke Supabase menggunakan Row Level Security (RLS).
- **Branding:** Identitas visual (logo, palet warna, tipografi) dirancang oleh developer sebagai bagian dari fase desain awal proyek ini.
- **Domain:** Fase 1 menggunakan subdomain Vercel gratis. Fase 2 migrasi ke domain berbayar kustom.

---

## 6. Rekomendasi Struktur Data (Supabase / PostgreSQL)

Berikut skema tabel database yang direkomendasikan pada Supabase.

### Tabel: `pengurus`
Digunakan bersama untuk pengurus RT dan pengurus unit usaha berdasarkan kolom `kategori`.

```sql
CREATE TABLE pengurus (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama        TEXT NOT NULL,
  jabatan     TEXT NOT NULL,
  foto_url    TEXT,                        -- URL dari Supabase Storage
  kategori    TEXT NOT NULL DEFAULT 'RT',  -- 'RT', 'BIOFLOK', 'BANK_SAMPAH'
  urutan      INT DEFAULT 99,              -- Untuk mengatur urutan tampilan
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel: `kegiatan`

```sql
CREATE TABLE kegiatan (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul               TEXT NOT NULL,
  tanggal_pelaksanaan DATE NOT NULL,
  deskripsi_singkat   TEXT,
  foto_url            TEXT,                -- URL dari Supabase Storage
  created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### Tabel: `badan_usaha`
Data semi-statis yang bisa diedit oleh admin.

```sql
CREATE TABLE badan_usaha (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_usaha          TEXT NOT NULL,
  slug                TEXT UNIQUE NOT NULL, -- 'bioflok' atau 'bank-sampah'
  deskripsi           TEXT,
  jadwal_operasional  TEXT,
  kontak_whatsapp     TEXT,
  foto_url            TEXT,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);
```

> **Catatan:** Pengurus untuk setiap badan usaha diambil dari tabel `pengurus` berdasarkan filter kolom `kategori` (`'BIOFLOK'` atau `'BANK_SAMPAH'`).

---

## 7. Struktur Halaman & Routing (Next.js)

```
/                          -> Landing Page
/profil                    -> Halaman Profil RT
/kegiatan                  -> Halaman Kegiatan Warga
/badan-usaha               -> Halaman Hub Badan Usaha
/badan-usaha/bioflok       -> Sub-page Ternak Ikan Bioflok
/badan-usaha/bank-sampah   -> Sub-page Bank Sampah
/admin                     -> Halaman Login Admin
/admin/dashboard           -> Dashboard Admin (protected)
/admin/dashboard/kegiatan  -> Kelola Kegiatan
/admin/dashboard/pengurus  -> Kelola Pengurus
/admin/dashboard/usaha     -> Kelola Info Badan Usaha
```

---

## 8. Rencana Pengembangan (Phases)

| Fase | Deskripsi | Estimasi |
|---|---|---|
| **Fase 1 — Setup & Desain** | Inisialisasi project Next.js, konfigurasi Supabase, pembuatan desain sistem (warna, font, komponen) | Minggu 1 |
| **Fase 2 — Halaman Publik** | Pembangunan semua halaman publik (Landing, Profil, Kegiatan, Badan Usaha, Sub-page) | Minggu 2–3 |
| **Fase 3 — Admin Panel** | Pembangunan halaman `/admin` dengan fitur CRUD penuh dan autentikasi | Minggu 4 |
| **Fase 4 — PWA & Push Notification** | Implementasi PWA agar aplikasi dapat diinstal dan mengaktifkan notifikasi Web Push | Minggu 4 |
| **Fase 5 — Polish & Deploy** | Pengujian responsivitas, optimasi performa, dan deploy ke Vercel | Minggu 5 |
| **Fase 6 (Opsional)** | Migrasi ke domain kustom berbayar | Menyesuaikan |
