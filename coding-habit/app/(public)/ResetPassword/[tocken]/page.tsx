'use client'
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage( {params }: { params: { token: string } }
){
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const recovery = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();   
        const res = await fetch('/api/sendMail',{
            method: 'POST',
            body: JSON.stringify({email: email})
        })
        console.log(res)
    }


    const router = useRouter();
    return(
        <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] font-mono">
            <form
                onSubmit={recovery}
                className="w-full max-w-md rounded border-2 border-[var(--neon-green-dark)] bg-[var(--bg-card)] p-8 shadow-[0_0_20px_var(--neon-glow-faint)]"
            >
                <h1 className="mb-6 text-center text-2xl font-bold text-[var(--neon-green)] uppercase tracking-wider">
                    Recuperar Contraseña
                </h1>

                {error && (
                <p className="mb-4 rounded border border-[var(--error-border)] bg-[var(--error-bg)] p-2 text-sm text-[var(--error-text)]">
                    {error}
                </p>
                )}

                <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                    Ingresa nueva contraseña
                </label>
                <input
                    type="password"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--input-focus)] focus:shadow-[0_0_10px_var(--neon-glow-faint)]"
                />
                <div className="mb-6"></div>
                <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
                    Vuelve a ingresar la contraseña
                </label>
                <input
                    type="password"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--input-focus)] focus:shadow-[0_0_10px_var(--neon-glow-faint)]"
                />
                </div>
                
                <div className="mb-6">
        <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-[var(--btn-primary-bg)] py-2 font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 transition-all"
        >
        {loading ? "Actualizando..." : "Recuperar"}
        </button>
        </div>
        <div className="mb-6">
        <button
        type="button"
        className="w-full rounded border border-[var(--neon-green-dark)] bg-transparent py-2 font-semibold text-[var(--neon-green)] hover:bg-[var(--neon-glow-faint)] transition-all"
        onClick={()=>router.push('/signin')}
        >
        Atras
        </button>
        </div>
            </form>
        </div>
    );
    }
