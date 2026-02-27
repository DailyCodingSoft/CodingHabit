import { useState, KeyboardEvent } from "react";
import { HABIT_CONFIG } from "@/utils/constants";

type UsernameInputProps = {
    usernames: string[];
    onUsernamesChange: (usernames: string[]) => void;
    creatorUsername: string;
    label?: string;
    placeholder?: string;
    error?: string;
};

export default function UsernameInput({ 
    usernames, 
    onUsernamesChange,
    creatorUsername,
    label = "Participantes", 
    placeholder = "Ingresa un username de GitHub",
    error 
}: UsernameInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');

    const totalParticipants = usernames.length + 1;
    const canAddMore = totalParticipants < HABIT_CONFIG.MAX_PARTICIPANTS;

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addUsername();
        }
    }

    function addUsername() {
        if (!canAddMore) {
            setInputError(`Máximo ${HABIT_CONFIG.MAX_PARTICIPANTS} participantes permitidos`);
            return;
        }

        const trimmedValue = inputValue.trim();
        
        if (!trimmedValue) {
            setInputError('El username no puede estar vacío');
            return;
        }

        if (!/^[a-zA-Z0-9-]+$/.test(trimmedValue)) {
            setInputError('Username inválido. Solo letras, números y guiones');
            return;
        }

        if (trimmedValue === creatorUsername) {
            setInputError('Ya eres parte del hábito');
            return;
        }

        if (usernames.includes(trimmedValue)) {
            setInputError('Este usuario ya está en la lista');
            return;
        }

        onUsernamesChange([...usernames, trimmedValue]);
        setInputValue('');
        setInputError('');
    }

    function removeUsername(usernameToRemove: string) {
        onUsernamesChange(usernames.filter(u => u !== usernameToRemove));
    }

    return (
        <div>
            <label className="block text-[var(--neon-green)] mb-2 text-sm font-mono uppercase tracking-wider">
                {label} ({totalParticipants}/{HABIT_CONFIG.MAX_PARTICIPANTS})
            </label>
            
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setInputError('');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={!canAddMore}
                    className="flex-1 p-3 rounded-sm bg-[var(--landing-card-bg)] text-[var(--neon-green-muted)] border border-[var(--neon-green-dark)] focus:outline-none focus:border-[var(--neon-green)] focus:shadow-[0_0_10px_var(--neon-glow-soft)] font-mono placeholder:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="button"
                    onClick={addUsername}
                    disabled={!canAddMore}
                    className="px-4 py-2 bg-[var(--neon-green)] hover:bg-[var(--neon-green-light)] text-[var(--landing-bg)] rounded-sm transition-all font-mono font-bold uppercase text-sm shadow-[0_0_15px_var(--neon-glow-soft)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Agregar
                </button>
            </div>

            {(inputError || error) && (
                <p className="mt-1 text-sm text-red-400">{inputError || error}</p>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--neon-green)] rounded-sm text-sm">
                    <span className="text-[var(--landing-bg)] font-bold font-mono">{creatorUsername}</span>
                    <span className="text-[var(--landing-bg)] text-xs font-mono">(Tú)</span>
                </div>
                {usernames.map((username) => (
                    <div
                        key={username}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[var(--landing-card-bg)] border border-[var(--neon-green-dark)] rounded-sm text-sm"
                    >
                        <span className="text-[var(--neon-green-muted)] font-mono">{username}</span>
                        <button
                            type="button"
                            onClick={() => removeUsername(username)}
                            className="text-[var(--neon-green-muted)] hover:text-red-400 font-bold"
                            aria-label={`Remover ${username}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
