"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";

export default function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isInstallable) return null;

  return (
    <button
      type="button"
      onClick={handleInstallClick}
      className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold border-2 transition-all hover:bg-gray-50"
      style={{ 
        borderColor: "var(--green-700)",
        color: "var(--green-800)",
        background: "transparent"
      }}
    >
      <Download size={18} />
      Install App Admin ke HP
    </button>
  );
}
