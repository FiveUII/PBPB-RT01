-- ==========================================
-- SCRIPT SETUP DATABASE SUPABASE & STORAGE
-- Project: Website Profil Perumahan RT
-- ==========================================

-- 1. Hapus tabel jika sudah ada (opsional, hati-hati jika ada data penting)
-- DROP TABLE IF EXISTS pengumuman;
-- DROP TABLE IF EXISTS badan_usaha;
-- DROP TABLE IF EXISTS kegiatan;
-- DROP TABLE IF EXISTS pengurus;

-- ==========================================
-- PEMBUATAN TABEL
-- ==========================================

-- Tabel: pengurus
CREATE TABLE pengurus (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama        TEXT NOT NULL,
  jabatan     TEXT NOT NULL,
  foto_url    TEXT,
  no_telp     TEXT,
  kategori    TEXT NOT NULL DEFAULT 'RT',  -- 'RT', 'BIOFLOK', 'BANK_SAMPAH'
  urutan      INT DEFAULT 99,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel: kegiatan
CREATE TABLE kegiatan (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul               TEXT NOT NULL,
  tanggal_pelaksanaan DATE NOT NULL,
  deskripsi_singkat   TEXT,
  foto_url            TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel: badan_usaha
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

-- Tabel: pengumuman
CREATE TABLE pengumuman (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  judul       TEXT NOT NULL,
  deskripsi   TEXT NOT NULL,
  tipe        TEXT NOT NULL DEFAULT 'INFO', -- 'PENTING', 'INFO', 'JADWAL'
  tanggal     DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) UNTUK TABEL
-- ==========================================

-- Aktifkan RLS untuk semua tabel
ALTER TABLE pengurus ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE badan_usaha ENABLE ROW LEVEL SECURITY;
ALTER TABLE pengumuman ENABLE ROW LEVEL SECURITY;

-- Kebijakan: Publik bisa membaca (SELECT) semua tabel
CREATE POLICY "Publik bisa melihat pengurus" ON pengurus FOR SELECT USING (true);
CREATE POLICY "Publik bisa melihat kegiatan" ON kegiatan FOR SELECT USING (true);
CREATE POLICY "Publik bisa melihat badan_usaha" ON badan_usaha FOR SELECT USING (true);
CREATE POLICY "Publik bisa melihat pengumuman" ON pengumuman FOR SELECT USING (true);

-- Kebijakan: Hanya Admin (Authenticated) yang bisa menambah, mengubah, menghapus data
CREATE POLICY "Admin bisa insert pengurus" ON pengurus FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin bisa update pengurus" ON pengurus FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin bisa delete pengurus" ON pengurus FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin bisa insert kegiatan" ON kegiatan FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin bisa update kegiatan" ON kegiatan FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin bisa delete kegiatan" ON kegiatan FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin bisa insert badan_usaha" ON badan_usaha FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin bisa update badan_usaha" ON badan_usaha FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin bisa delete badan_usaha" ON badan_usaha FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin bisa insert pengumuman" ON pengumuman FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin bisa update pengumuman" ON pengumuman FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin bisa delete pengumuman" ON pengumuman FOR DELETE TO authenticated USING (true);


-- ==========================================
-- SETUP STORAGE BUCKET (public-assets)
-- ==========================================

-- Buat bucket baru bernama 'public-assets' (jika belum ada)
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Kebijakan Storage: Publik bisa melihat (SELECT) file
CREATE POLICY "Publik bisa melihat file di public-assets"
ON storage.objects FOR SELECT
USING ( bucket_id = 'public-assets' );

-- Kebijakan Storage: Hanya Admin yang bisa mengunggah, mengubah, menghapus file
CREATE POLICY "Admin bisa upload file ke public-assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'public-assets' );

CREATE POLICY "Admin bisa update file di public-assets"
ON storage.objects FOR UPDATE TO authenticated
USING ( bucket_id = 'public-assets' );

CREATE POLICY "Admin bisa delete file di public-assets"
ON storage.objects FOR DELETE TO authenticated
USING ( bucket_id = 'public-assets' );

-- ==========================================
-- INSERT DATA AWAL BADAN USAHA
-- ==========================================
INSERT INTO badan_usaha (nama_usaha, slug, deskripsi, jadwal_operasional, kontak_whatsapp)
VALUES 
  ('Ternak Ikan Bioflok', 'bioflok', 'Unit usaha Ternak Ikan Bioflok RT 01 menggunakan teknologi bioflok hemat air.', 'Setiap 60–90 hari panen', '0812-XXXX-XXXX'),
  ('Bank Sampah Guyub Rukun', 'bank-sampah', 'Tukarkan sampah anorganik menjadi saldo tabungan atau sembako setiap Minggu pagi.', 'Setiap Minggu, 08.00–11.00 WIB', '0812-XXXX-XXXX')
ON CONFLICT (slug) DO NOTHING;
