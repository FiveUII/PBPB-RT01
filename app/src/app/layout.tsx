import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "RT 01 Perumahan Bukit Pinang Bahari",
  description:
    "Portal warga resmi RT 01 Perumahan Bukit Pinang Bahari — informasi kegiatan, profil pengurus, dan unit usaha warga.",
  manifest: "/manifest.json",
  themeColor: "#1B4332",
  icons: { apple: "/icons/icon-192.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={plusJakarta.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen bg-[var(--surface)]">{children}</body>
    </html>
  );
}
