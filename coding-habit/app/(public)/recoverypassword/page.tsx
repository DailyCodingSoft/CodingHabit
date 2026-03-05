'use client'
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/ui/alert/alertLoginAndRegister';

type AlertState = {
  message: string;
  type: "error" | "success" | "info";
};

export default function recoverypassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState<AlertState | null>(null)
  



    const recovery = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor ingresa un correo válido');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/sendMail', {
                method: 'POST',
                body: JSON.stringify({ email: email })
            });

            if (res.ok) {
                setSuccess('Correo enviado. Revisa tu bandeja de entrada.');
                setEmail('');
                setMessageAlert({ message: "Correo enviado con éxito", type: "success" });
            } else {
                setError('Error al enviar el correo, valida tu coreo e intenta nuevamente.');
                setMessageAlert({ message: "Error al enviar el correo", type: "error" });
            }
        } catch {
            setError('Error de conexión. Intenta nuevamente.');
        } finally { 
            setLoading(false);
            setAlert(true);
             router.push('/signin');
        }
    }


    const router = useRouter();
    return (
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
                        Nombre de usuario
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
            <ConfirmModal
                    open={alert}
                    message={messageAlert?.message ?? ""}
                    type={messageAlert?.type}
                    onAccept={() => {
                      setAlert(false);
                      if (messageAlert?.type === "success") {
                        router.push("/signin");
                      }
                    }}
                  />
        </div>
    );
}