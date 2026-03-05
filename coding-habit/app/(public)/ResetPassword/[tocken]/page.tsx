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
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={recovery}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-[var(--shadow-md)]"
            >
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Recuperar Contraseña
                </h1>

                {error && (
                <p className="mb-4 rounded bg-[var(--color-error-bg)] p-2 text-sm text-[var(--color-error)]">
                    {error}
                </p>
                )}

                <div className="mb-4">
                <label className="mb-1 block text-sm font-medium">
                    Ingresa nueva contaraseña
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <div className="mb-6"></div>
                <label className="mb-1 block text-sm font-medium">
                    Vuelve a ingresar la contraseña
                </label>
                <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                </div>
                
                <div className="mb-6">
        <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-[var(--color-info)] py-2 font-semibold text-white hover:bg-[var(--color-info-border)] disabled:opacity-50"
        >
        {loading ? "Registrando..." : "Recuperar"}
        </button>
        </div>
        <div className="mb-6">
        <button
        className="w-full rounded bg-[var(--color-info)] py-2 font-semibold text-white hover:bg-[var(--color-info-border)]"
        onClick={()=>router.push('/signin')}
        >
        Atras
        </button>
        </div>
            </form>
        </div>
    );
    }