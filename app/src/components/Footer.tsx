import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto pt-12 pb-6 px-5"
      style={{ background: "var(--green-900)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-white/80">
          
          {/* Identity */}
          <div>
            <h3 className="font-bold text-lg text-white mb-3">RT 01 Bukit Pinang Bahari</h3>
            <p className="text-sm leading-relaxed mb-4">
              Samarinda — Bersatu, Maju, Sejahtera. Mewujudkan lingkungan yang asri, aman, dan nyaman untuk seluruh warga.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base text-white mb-3">Tautan Cepat</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/profil" className="hover:text-white transition-colors">Profil RT</Link></li>
              <li><Link href="/kegiatan" className="hover:text-white transition-colors">Kegiatan Warga</Link></li>
              <li><Link href="/badan-usaha" className="hover:text-white transition-colors">Badan Usaha (BUMRT)</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base text-white mb-3">Kontak & Lokasi</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>Perumahan Bukit Pinang Bahari, Blok A5 No 22</li>
              <li>Kelurahan Gunung Panjang, Kecamatan Samarinda Seberang</li>
              <li>WhatsApp: 0812-5302-7456</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            © {year} RT 01 Perumahan Bukit Pinang Bahari. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
