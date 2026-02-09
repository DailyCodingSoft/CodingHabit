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
                className="block text-[var(--text-muted-color)] mb-2"
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
                className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
            />
        </div>
    );
}
