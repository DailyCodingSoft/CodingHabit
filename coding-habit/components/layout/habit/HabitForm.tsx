import { FormEvent, useRef, useState } from "react";
import { formatNumberToCurrency } from "@/utils/helpers";
import DatePicker from "@/components/ui/date-picker/DatePicker";

export default function HabitForm(props: {onSubmit: (event:FormEvent<HTMLFormElement>) => void}) {
    const [debtInput, setDebtInput] = useState('');
    const [title, setTitle] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [errors, setErrors] = useState<{ title?: string; initialDate?: string; endDate?: string; debtValue?: string }>({});
    const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];

    function getNextDayString(dateString: string) {
        if (!dateString) return '';
        const date = new Date(`${dateString}T00:00:00`);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    }

    function applyFormatToNumber(value:string){
        const formatNumber = value.replaceAll('$','').replaceAll('.','');
        const formatted = formatNumberToCurrency(formatNumber);
        setDebtInput(formatted);
        return formatted;
    }

    function validateField(field: "title" | "initialDate" | "endDate" | "debtValue", valueOverride?: string) {
        const nextErrors: typeof errors = {};
        const titlePattern = /^[A-Za-z0-9]{3,30}$/;

        if (field === "title") {
            const nextTitle = valueOverride ?? title;
            if (!titlePattern.test(nextTitle)) {
                nextErrors.title = "El título debe tener entre 3 y 30 caracteres, sin espacios ni caracteres especiales.";
            }
        }

        if (field === "initialDate") {
            const nextInitial = valueOverride ?? initialDate;
            if (!nextInitial) {
                nextErrors.initialDate = "La fecha inicial es obligatoria.";
            } else if (new Date(`${nextInitial}T00:00:00`) < today) {
                nextErrors.initialDate = "La fecha inicial no puede ser anterior a hoy.";
            }

            if (endDate && nextInitial) {
                const initial = new Date(`${nextInitial}T00:00:00`);
                const end = new Date(`${endDate}T00:00:00`);
                if (end <= initial) {
                    nextErrors.endDate = "La fecha final debe ser posterior a la fecha inicial.";
                }
            }
        }

        if (field === "endDate") {
            const nextEnd = valueOverride ?? endDate;
            if (nextEnd && initialDate) {
                const initial = new Date(`${initialDate}T00:00:00`);
                const end = new Date(`${nextEnd}T00:00:00`);
                if (end <= initial) {
                    nextErrors.endDate = "La fecha final debe ser posterior a la fecha inicial.";
                }
            }
        }

        if (field === "debtValue") {
            const nextDebt = valueOverride ?? debtInput;
            const numericDebt = Number(nextDebt.replaceAll('$', '').replaceAll('.', '').replaceAll(',', ''));
            if (!numericDebt || numericDebt <= 0) {
                nextErrors.debtValue = "El valor de la deuda debe ser mayor a 0.";
            }
        }

        return nextErrors;
    }

    function scheduleValidation(field: "title" | "initialDate" | "endDate" | "debtValue", valueOverride?: string) {
        const existingTimer = debounceTimers.current[field];
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        debounceTimers.current[field] = setTimeout(() => {
            const nextErrors = validateField(field, valueOverride);
            setErrors((prev) => ({
                ...prev,
                ...nextErrors,
                ...(field === "endDate" && !nextErrors.endDate ? { endDate: undefined } : {}),
                ...(field === "initialDate" && !nextErrors.initialDate ? { initialDate: undefined } : {}),
                ...(field === "title" && !nextErrors.title ? { title: undefined } : {}),
                ...(field === "debtValue" && !nextErrors.debtValue ? { debtValue: undefined } : {}),
            }));
        }, 600);
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        const validationErrors: typeof errors = {};
        const titlePattern = /^[A-Za-z0-9]{3,30}$/;

        if (!titlePattern.test(title)) {
            validationErrors.title = "El título debe tener entre 3 y 30 caracteres, sin espacios ni caracteres especiales.";
        }

        if (!initialDate) {
            validationErrors.initialDate = "La fecha inicial es obligatoria.";
        } else if (new Date(`${initialDate}T00:00:00`) < today) {
            validationErrors.initialDate = "La fecha inicial no puede ser anterior a hoy.";
        }

        if (endDate && initialDate) {
            const initial = new Date(`${initialDate}T00:00:00`);
            const end = new Date(`${endDate}T00:00:00`);
            if (end <= initial) {
                validationErrors.endDate = "La fecha final debe ser posterior a la fecha inicial.";
            }
        }

        const numericDebt = Number(debtInput.replaceAll('$', '').replaceAll('.', '').replaceAll(',', ''));
        if (!numericDebt || numericDebt <= 0) {
            validationErrors.debtValue = "El valor de la deuda debe ser mayor a 0.";
        }

        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            event.preventDefault();
            return;
        }

        props.onSubmit(event);
    }

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[var(--surface-color)] border border-[var(--surface-border-color)] rounded-xl p-6 w-full max-w-xl shadow-2xl"
            >
                <h2 className="text-[var(--text-primary-color)] text-2xl font-semibold tracking-tight text-center mb-6">
                    Crear hábito
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Titulo del habito</label>
                        <input
                            name="title"
                            type="text"
                            placeholder="Mi Habito"
                            value={title}
                            onChange={(event) => {
                                const value = event.target.value;
                                setTitle(value);
                                scheduleValidation("title", value);
                            }}
                            minLength={3}
                            maxLength={30}
                            pattern="[A-Za-z0-9]{3,30}"
                            required
                            className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-400">{errors.title}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker
                            name="initialDate"
                            label="Fecha inicial"
                            placeholder="hoy"
                            value={initialDate}
                            onChange={(event) => {
                                const value = event.target.value;
                                setInitialDate(value);
                                scheduleValidation("initialDate", value);
                                if (endDate) {
                                    scheduleValidation("endDate", endDate);
                                }
                            }}
                            min={todayString}
                            required
                        />
                        {errors.initialDate && (
                            <p className="text-sm text-red-400 md:col-span-2">{errors.initialDate}</p>
                        )}

                        <DatePicker
                            name="endDate"
                            label="Fecha Final"
                            placeholder="en 6 meses"
                            value={endDate}
                            onChange={(event) => {
                                const value = event.target.value;
                                setEndDate(value);
                                scheduleValidation("endDate", value);
                            }}
                            min={getNextDayString(initialDate) || todayString}
                        />
                        {errors.endDate && (
                            <p className="text-sm text-red-400 md:col-span-2">{errors.endDate}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Valor de la deuda</label>
                        <input
                            onChange={e => {
                                const formatted = applyFormatToNumber(e.target.value);
                                scheduleValidation("debtValue", formatted);
                            }}
                            value={debtInput}
                            name="debtValue"
                            type="text"
                            placeholder="$5000"
                            inputMode="numeric"
                            required
                            className="w-full p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errors.debtValue && (
                            <p className="mt-1 text-sm text-red-400">{errors.debtValue}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-[var(--text-muted-color)] mb-2">Es deuda acumulativa?:</label>
                        <input
                            name="isCumulative"
                            type="checkbox"
                            value="yes"
                            className="h-5 w-5 rounded border border-[var(--input-border-color)] bg-[var(--surface-muted-color)] text-[var(--primary-color)] focus:outline-none focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                    </div>
                </div>

                <div className="flex w-full gap-3 pt-6">
                    <button
                        type="submit"
                        className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        className="flex-1 bg-[var(--surface-border-color)] hover:bg-[var(--input-border-color)] text-[var(--text-primary-color)] font-semibold py-2.5 px-4 rounded-lg transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}