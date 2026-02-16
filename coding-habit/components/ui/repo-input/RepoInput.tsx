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
            <label className="block text-[var(--text-muted-color)] mb-2">{label}</label>
            
            <div className="mb-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-sm text-yellow-200">
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
                            className="flex-1 p-3 rounded-lg bg-[var(--surface-muted-color)] text-[var(--text-primary-color)] border border-[var(--input-border-color)] focus:outline-none focus:border-[var(--primary-color)] focus:ring-2 focus:ring-[color:var(--primary-color)/.3]"
                        />
                        <button
                            type="button"
                            onClick={handleParse}
                            className="px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-[var(--text-primary-color)] rounded-lg transition-colors font-semibold"
                        >
                            Validar
                        </button>
                    </div>

                    {(inputError || error) && (
                        <p className="mt-1 text-sm text-red-400">{inputError || error}</p>
                    )}
                </>
            ) : (
                <div className="p-4 bg-[var(--surface-border-color)] rounded-lg border border-[var(--input-border-color)]">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-[var(--text-muted-color)] mb-1">Repositorio seleccionado:</p>
                            <p className="text-lg text-[var(--text-primary-color)] font-mono">
                                <span className="text-[var(--primary-color)]">{owner}</span>
                                <span className="text-[var(--text-muted-color)]">/</span>
                                <span className="font-semibold">{repo}</span>
                            </p>
                            <a 
                                href={`https://github.com/${owner}/${repo}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-[var(--primary-color)] hover:underline mt-1 inline-block"
                            >
                                Ver en GitHub →
                            </a>
                        </div>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="px-3 py-1.5 text-sm bg-[var(--surface-muted-color)] hover:bg-[var(--input-border-color)] text-[var(--text-primary-color)] rounded-lg transition-colors"
                        >
                            Cambiar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
