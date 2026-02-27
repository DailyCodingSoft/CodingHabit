interface NeonInputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function NeonInput({ name, type, label, placeholder, value, onChange, required }: NeonInputProps) {
  return (
    <div>
      <label className="block text-[var(--neon-green)] mb-2 text-sm font-mono uppercase tracking-wider">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 rounded-sm bg-[var(--landing-card-bg)] text-[var(--neon-green-muted)] border border-[var(--neon-green-dark)] focus:outline-none focus:border-[var(--neon-green)] focus:shadow-[0_0_10px_var(--neon-glow-soft)] font-mono placeholder:text-gray-600"
      />
    </div>
  );
}
