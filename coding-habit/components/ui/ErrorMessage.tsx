interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <p className="mb-4 rounded-sm bg-red-900/30 border border-red-500 p-3 text-sm text-red-400 font-mono">
      {message}
    </p>
  );
}
