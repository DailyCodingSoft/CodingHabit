import { useState, KeyboardEvent } from "react";

type UsernameInputProps = {
    usernames: string[];
    onUsernamesChange: (usernames: string[]) => void;
    label?: string;
    placeholder?: string;
    error?: string;
};

export default function UsernameInput({ 
    usernames, 
    onUsernamesChange, 
    label = "Participantes", 
    placeholder = "Ingresa un username de GitHub",
    error 
}: UsernameInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addUsername();
        }
    }

    function addUsername() {
        const trimmedValue = inputValue.trim();
        
        if (!trimmedValue) {
            setInputError('El username no puede estar vacío');
            return;
        }

        if (!/^[a-zA-Z0-9-]+$/.test(trimmedValue)) {
            setInputError('Username inválido. Solo letras, números y guiones');
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
            <label className="block text-[var(--text-muted-color)] mb-2">{label}</label>
            
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
                    className="flex-1 p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                />
                <button
                    type="button"
                    onClick={addUsername}
                    className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-[var(--text-primary-color)] rounded-lg transition-colors font-semibold"
                >
                    Agregar
                </button>
            </div>

            {(inputError || error) && (
                <p className="mt-1 text-sm text-red-400">{inputError || error}</p>
            )}

            {usernames.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {usernames.map((username) => (
                        <div
                            key={username}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[var(--surface-border-color)] rounded-full text-sm"
                        >
                            <span className="text-[var(--text-primary-color)]">{username}</span>
                            <button
                                type="button"
                                onClick={() => removeUsername(username)}
                                className="text-[var(--text-muted-color)] hover:text-red-400 font-bold"
                                aria-label={`Remover ${username}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
