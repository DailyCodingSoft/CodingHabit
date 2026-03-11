interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="mb-4 rounded-sm bg-[var(--color-error-bg)] border border-[var(--color-error-border)] p-3 text-sm text-[var(--color-error)] font-mono">
      {message}
    </p>
  );
}
