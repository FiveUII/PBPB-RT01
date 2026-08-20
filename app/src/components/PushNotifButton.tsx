"use client";
import { useState, useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotifButton({ className = "btn-accent text-sm px-4 py-2.5" }: { className?: string }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setIsSupported(false);
    }
  }, []);

  async function handleSubscribe() {
    if (!isSupported) {
      alert("Browser Anda tidak mendukung Push Notification.");
      return;
    }

    try {
      setLoading(true);
      const permission = await Notification.requestPermission();
      
      if (permission !== "granted") {
        alert("Izin notifikasi ditolak.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
        ),
      });

      const response = await fetch("/api/web-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "subscribe",
          subscription: subscription,
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        alert("Berhasil mengaktifkan notifikasi pengumuman!");
      } else {
        throw new Error("Gagal menyimpan langganan.");
      }
    } catch (error: any) {
      console.error(error);
      alert("Terjadi kesalahan: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  if (!isSupported) return null;

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading || isSubscribed}
      className={className}
      style={{ opacity: (loading || isSubscribed) ? 0.7 : 1 }}
    >
      {isSubscribed ? "✓ Notifikasi Aktif" : (loading ? "Memproses..." : "Aktifkan Sekarang")}
    </button>
  );
}
