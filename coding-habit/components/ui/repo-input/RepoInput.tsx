import { useState } from "react";

type RepoInputProps = {
    owner: string;
    repo: string;
    onRepoChange: (owner: string, repo: string) => void;
    label?: string;
    placeholder?: string;
    error?: string;
};

export default function RepoInput({
    owner,
    repo,
    onRepoChange,
    label = "Repositorio de GitHub",
    placeholder = "https://github.com/owner/repo",
    error
}: RepoInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');

    function parseRepoUrl(url: string): { owner: string; repo: string } | null {
        const trimmedUrl = url.trim();
        
        const githubPattern = /^https?:\/\/github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9._-]+)\/?$/;
        const match = trimmedUrl.match(githubPattern);
        
        if (match) {
            return {
                owner: match[1],
                repo: match[2]
            };
        }
        
        const shortPattern = /^([a-zA-Z0-9-]+)\/([a-zA-Z0-9._-]+)$/;
        const shortMatch = trimmedUrl.match(shortPattern);
        
        if (shortMatch) {
            return {
                owner: shortMatch[1],
                repo: shortMatch[2]
            };
        }
        
        return null;
    }

    function handleParse() {
        if (!inputValue.trim()) {
            setInputError('Debes ingresar una URL de repositorio');
            return;
        }

        const parsed = parseRepoUrl(inputValue);
        
        if (!parsed) {
            setInputError('URL inválida. Usa: https://github.com/owner/repo o owner/repo');
            return;
        }

        onRepoChange(parsed.owner, parsed.repo);
        setInputValue('');
        setInputError('');
    }

    function handleClear() {
        onRepoChange('', '');
    }

    return (
        <div>
            <label className="block text-[var(--neon-green)] mb-2 text-sm font-mono uppercase tracking-wider">{label}</label>
            
            <div className="mb-2 p-3 bg-[var(--color-warning-bg)] border border-[var(--color-warning-border)] rounded-sm">
                <p className="text-sm text-[var(--color-warning)] font-mono">
                    ⚠️ Solo se soportan repositorios <span className="font-semibold">públicos</span> en esta versión
                </p>
            </div>

            {!owner && !repo ? (
                <>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                                setInputError('');
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleParse();
                                }
                            }}
                            placeholder={placeholder}
                            className="flex-1 p-3 rounded-sm bg-[var(--landing-card-bg)] text-[var(--neon-green-muted)] border border-[var(--neon-green-dark)] focus:outline-none focus:border-[var(--neon-green)] focus:shadow-[var(--shadow-neon-sm)] font-mono placeholder:text-gray-600"
                        />
                        <button
                            type="button"
                            onClick={handleParse}
                            className="px-4 py-2 bg-[var(--neon-green)] hover:bg-[var(--neon-green-light)] text-[var(--landing-bg)] rounded-sm transition-all font-mono font-bold uppercase text-sm shadow-[var(--shadow-neon-md)]"
                        >
                            Validar
                        </button>
                    </div>

                    {(inputError || error) && (
                        <p className="mt-1 text-sm text-[var(--color-error)]">{inputError || error}</p>
                    )}
                </>
            ) : (
                <div className="p-4 bg-[var(--landing-card-bg)] rounded-sm border border-[var(--neon-green-dark)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--neon-green-muted)] mb-1 font-mono">Repositorio seleccionado:</p>
                            <p className="text-lg text-[var(--neon-green)] font-mono">
                                <span className="text-[var(--neon-green-light)]">{owner}</span>
                                <span className="text-[var(--neon-green-muted)]">/</span>
                                <span className="font-semibold">{repo}</span>
                            </p>
                            <a 
                                href={`https://github.com/${owner}/${repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--neon-green-light)] hover:text-[var(--neon-green)] hover:underline mt-1 inline-block font-mono"
                            >
                                Ver en GitHub →
                            </a>
                        </div>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-3 py-1.5 text-sm bg-transparent border border-[var(--neon-green-dark)] hover:border-[var(--neon-green)] text-[var(--neon-green)] rounded-sm transition-all font-mono"
                        >
                            Cambiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
