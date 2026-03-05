import { ChangeEvent } from "react";

interface DatePickerProps {
    id?: string;
    name: string;
    label: string;
    value?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    required?: boolean;
}

export default function DatePicker({
    id,
    name,
    label,
    value,
    onChange,
    placeholder,
    min,
    max,
    disabled = false,
    required = false,
}: DatePickerProps) {
    return (
        <div>
            <label
                htmlFor={id ?? name}
                className="block text-[var(--neon-green)] mb-2 text-sm font-mono uppercase tracking-wider"
            >
                {label}
            </label>
            <input
                id={id ?? name}
                name={name}
                type="date"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                min={min}
                max={max}
                disabled={disabled}
                required={required}
                className="w-full p-3 rounded-sm bg-[var(--landing-card-bg)] text-[var(--neon-green-muted)] border border-[var(--neon-green-dark)] focus:outline-none focus:border-[var(--neon-green)] focus:shadow-[var(--shadow-neon-sm)] font-mono [color-scheme:dark]"
            />
        </div>
    );
}
