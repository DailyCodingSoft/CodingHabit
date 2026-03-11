import React from "react";

type ModalType = "error" | "success" | "info" | "warning";

interface ConfirmModalProps {
  open: boolean;
  message: string;
  type?: ModalType;
  onAccept: () => void;
}

const styles: Record<ModalType, string> = {
  error: "border-[var(--color-error-border)] text-[var(--color-error)]",
  success: "border-[var(--color-success-border)] text-[var(--color-success)]",
  info: "border-[var(--color-info-border)] text-[var(--color-info)]",
  warning: "border-[var(--color-warning-border)] text-[var(--color-warning)]",
};

export default function ConfirmModal({
  open,
  message,
  type = "error",
  onAccept,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-black)]/50">
              <div
        className={`w-full max-w-sm rounded-lg border bg-[var(--color-white)] p-6 shadow-[var(--shadow-lg)] ${styles[type]}`}
      >
        <p className="mb-6 text-center text-sm">{message}</p>

        <button
          onClick={onAccept}
          className="w-full rounded bg-[var(--color-info)] py-2 font-semibold text-[var(--color-white)] hover:bg-[var(--color-info-border)]"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
