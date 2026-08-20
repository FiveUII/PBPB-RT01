-- Tabel untuk menyimpan langganan Web Push Notifikasi warga
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL UNIQUE,
  keys JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktifkan RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Warga (publik) bisa menambah langganan (subscribe)
CREATE POLICY "Publik bisa insert subscriptions" 
ON subscriptions FOR INSERT 
WITH CHECK (true);

-- Admin (authenticated) bisa membaca (untuk broadcast) dan menghapus
CREATE POLICY "Admin bisa select subscriptions" 
ON subscriptions FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Admin bisa delete subscriptions" 
ON subscriptions FOR DELETE 
TO authenticated 
USING (true);
