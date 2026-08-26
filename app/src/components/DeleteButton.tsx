"use client";

import { useTransition } from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  itemName?: string;
}

export default function DeleteButton({ onDelete, itemName = "data ini" }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Data?",
      text: `Apakah Anda yakin ingin menghapus ${itemName}? Tindakan ini tidak dapat dibatalkan.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // red
      cancelButtonColor: "#6b7280", // gray
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        startTransition(async () => {
          try {
            await onDelete();
            Swal.fire({
              title: "Terhapus!",
              text: `${itemName} berhasil dihapus.`,
              icon: "success",
              confirmButtonColor: "#16a34a", // green
            });
          } catch (e: any) {
            Swal.fire({
              title: "Gagal",
              text: e.message || "Gagal menghapus data.",
              icon: "error",
              confirmButtonColor: "#e11d48",
            });
          }
        });
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
      title="Hapus"
    >
      <Trash2 size={16} />
    </button>
  );
}
