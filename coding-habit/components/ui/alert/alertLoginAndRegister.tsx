import React from "react";

type ModalType = "error" | "success" | "info" | "warning";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  type?: ModalType;
  onAccept: () => void;
}

const styles: Record<ModalType, string> = {
  error: "border-red-500 text-red-700",
  success: "border-green-500 text-green-700",
  info: "border-blue-500 text-blue-700",
  warning: "border-yellow-500 text-yellow-700",
};

export default function ConfirmModal({
  open,
  message,
  type = "error",
  onAccept,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <h1>Sapoperrr</h1>
      <div
        className={`w-full max-w-sm rounded-lg border bg-white p-6 shadow-lg ${styles[type]}`}
      >
        <p className="mb-6 text-center text-sm">{message}</p>

        <button
          onClick={onAccept}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
