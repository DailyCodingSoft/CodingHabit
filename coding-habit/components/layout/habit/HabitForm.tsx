import { FormEvent, useRef, useState } from "react";
import { formatNumberToCurrency } from "@/utils/helpers";
import { validateHabitTitle, validateInitialDate, validateEndDate, validateDebtValue, validateRepository } from "@/utils/validation";
import DatePicker from "@/components/ui/date-picker/DatePicker";
import UsernameInput from "@/components/ui/username-input/UsernameInput";
import RepoInput from "@/components/ui/repo-input/RepoInput";
import NeonInput from "@/components/ui/NeonInput";
import NeonFormContainer from "@/components/ui/NeonFormContainer";
import NeonButton from "@/components/ui/NeonButton";

export default function HabitForm(props: {
    onSubmit: (event:FormEvent<HTMLFormElement>) => void;
    creatorUsername: string;
}) {
    const [debtInput, setDebtInput] = useState('');
    const [title, setTitle] = useState('');
    const [initialDate, setInitialDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [participants, setParticipants] = useState<string[]>([]);
    const [repoOwner, setRepoOwner] = useState('');
    const [repoName, setRepoName] = useState('');
    const [errors, setErrors] = useState<{ title?: string; initialDate?: string; endDate?: string; debtValue?: string; repo?: string }>({});
    const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout> | null>>({});

    function handleRepoChange(owner: string, repo: string) {
        setRepoOwner(owner);
        setRepoName(repo);
    }

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

        if (field === "title") {
            const nextTitle = valueOverride ?? title;
            nextErrors.title = validateHabitTitle(nextTitle);
        }

        if (field === "initialDate") {
            const nextInitial = valueOverride ?? initialDate;
            nextErrors.initialDate = validateInitialDate(nextInitial);

            if (endDate && nextInitial) {
                nextErrors.endDate = validateEndDate(endDate, nextInitial);
            }
        }

        if (field === "endDate") {
            const nextEnd = valueOverride ?? endDate;
            if (nextEnd && initialDate) {
                nextErrors.endDate = validateEndDate(nextEnd, initialDate);
            }
        }

        if (field === "debtValue") {
            const nextDebt = valueOverride ?? debtInput;
            nextErrors.debtValue = validateDebtValue(nextDebt);
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

        validationErrors.title = validateHabitTitle(title);
        validationErrors.initialDate = validateInitialDate(initialDate);
        
        if (endDate && initialDate) {
            validationErrors.endDate = validateEndDate(endDate, initialDate);
        }

        validationErrors.debtValue = validateDebtValue(debtInput);
        validationErrors.repo = validateRepository(repoOwner, repoName);

        const filteredErrors = Object.fromEntries(
            Object.entries(validationErrors).filter(([_, v]) => v !== undefined)
        ) as typeof errors;

        setErrors(filteredErrors);
        if (Object.keys(filteredErrors).length > 0) {
            event.preventDefault();
            return;
        }

        props.onSubmit(event);
    }

    return (
        <NeonFormContainer protocol="NEW HABIT PROTOCOL" title="Crear Hábito" onSubmit={handleSubmit} maxWidth="2xl">
            <div className="space-y-6">
                <NeonInput
                    name="title"
                    type="text"
                    label="Título del hábito"
                    placeholder="Mi Habito"
                    value={title}
                    onChange={(event) => {
                        const value = event.target.value;
                        setTitle(value);
                        scheduleValidation("title", value);
                    }}
                    required
                    error={errors.title}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
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
                            <p className="text-sm text-[var(--color-error)] mt-1">{errors.initialDate}</p>
                        )}
                    </div>

                    <div>
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
                            <p className="text-sm text-[var(--color-error)] mt-1">{errors.endDate}</p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-[var(--neon-green)] mb-2 text-sm font-mono uppercase tracking-wider">Valor de la deuda</label>
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
                        className="w-full p-3 rounded-sm bg-[var(--landing-card-bg)] text-[var(--neon-green-muted)] border border-[var(--neon-green-dark)] focus:outline-none focus:border-[var(--neon-green)] focus:shadow-[var(--shadow-neon-sm)] font-mono placeholder:text-[var(--color-gray-600)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    {errors.debtValue && (
                        <p className="mt-1 text-sm text-[var(--color-error)]">{errors.debtValue}</p>
                    )}
                </div>

                <div>
                    <label className="flex items-center gap-3 text-[var(--neon-green)] text-sm font-mono uppercase tracking-wider cursor-pointer">
                        <span>Es deuda acumulativa?:</span>
                        <input
                            name="isCumulative"
                            type="checkbox"
                            value="yes"
                            className="h-5 w-5 rounded-sm border-2 border-[var(--neon-green-dark)] bg-[var(--landing-card-bg)] text-[var(--neon-green)] focus:outline-none focus:ring-2 focus:ring-[var(--neon-glow-soft)] accent-[var(--neon-green)] cursor-pointer"
                        />
                        <span className="text-xs text-[var(--neon-green-muted)] normal-case tracking-normal">
                            Sí, acumular deuda por días no cumplidos
                        </span>
                    </label>
                </div>

                <UsernameInput
                    usernames={participants}
                    onUsernamesChange={setParticipants}
                    creatorUsername={props.creatorUsername}
                    label="Participantes del hábito"
                    placeholder="Ingresa username de GitHub"
                />
                <input type="hidden" name="participants" value={JSON.stringify(participants)} />

                <RepoInput
                    owner={repoOwner}
                    repo={repoName}
                    onRepoChange={handleRepoChange}
                    error={errors.repo}
                />
                <input type="hidden" name="repoOwner" value={repoOwner} />
                <input type="hidden" name="repoName" value={repoName} />
            </div>

            <div className="flex flex-col sm:flex-row w-full gap-4 pt-8">
                <NeonButton type="submit">
                    Guardar
                </NeonButton>
                <NeonButton variant="secondary">
                    Cancelar
                </NeonButton>
            </div>
        </NeonFormContainer>
    )
}
