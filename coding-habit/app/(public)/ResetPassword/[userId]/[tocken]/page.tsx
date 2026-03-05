'use client'
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useParams } from "next/navigation";
import ConfirmModal from "@/components/ui/alert/alertLoginAndRegister"

// Reglas de validación
const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
};

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export default function ResetPasswordPage(){
    const params = useParams();
    const rawtoken = params?.tocken as string || '';
    const id = params?.userId as string || '';
    const token = decodeURIComponent(rawtoken);

    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [LoadingPage, setLoadingPage] = useState(true);
    const [errorModal, setErrorModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    // Función de validación de contraseña
    const validatePassword = (pwd: string): ValidationResult => {
        const errors: string[] = [];

        if (pwd.length < PASSWORD_RULES.minLength) {
            errors.push(`Mínimo ${PASSWORD_RULES.minLength} caracteres`);
        }
        if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(pwd)) {
            errors.push('Debe incluir al menos una mayúscula');
        }
        if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(pwd)) {
            errors.push('Debe incluir al menos una minúscula');
        }
        if (PASSWORD_RULES.requireNumber && !/\d/.test(pwd)) {
            errors.push('Debe incluir al menos un número');
        }
        if (PASSWORD_RULES.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
            errors.push('Debe incluir al menos un carácter especial');
        }

        return { isValid: errors.length === 0, errors };
    };

    // Validar en tiempo real
    useEffect(() => {
        if (password) {
            const validation = validatePassword(password);
            setValidationErrors(validation.errors);
        } else {
            setValidationErrors([]);
        }
    }, [password]);

    useEffect(() => {
        const sendToken = async () => {
            if (!token) return;
            const res = await fetch('/api/auth/recoveryPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, id })
            });

            const data = await res.json();
            if (data.error) {
                setErrorModal(data.error);
                setShowErrorModal(true);
            }
            setLoadingPage(false);
        };

        sendToken();
    }, [token]);

    const recovery = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validar contraseña
        const validation = validatePassword(password);
        if (!validation.isValid) {
            setError('La contraseña no cumple con los requisitos de seguridad');
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== verifyPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/auth/recoveryPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, id, password })
            });

            const data = await res.json();
            
            if (data.error) {
                setError(data.error);
            } else {
                // Redirigir al login con mensaje de éxito
                router.push('/signin?reset=success');
            }
        } catch (err) {
            setError('Error al recuperar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    const router = useRouter();

    if (LoadingPage) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p>Validando token...</p>
            </div>
        );
    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form
                onSubmit={recovery}
                className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
            >
                <h1 className="mb-6 text-center text-2xl font-bold">
                    Recuperar Contraseña
                </h1>

                {error && (
                    <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium">
                        Nueva contraseña
                    </label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    
                    {/* Indicadores de validación */}
                    {password && (
                        <div className="mt-2 text-xs">
                            {validationErrors.length > 0 ? (
                                <ul className="text-red-600">
                                    {validationErrors.map((err, idx) => (
                                        <li key={idx}>• {err}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-green-600">✓ Contraseña válida</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <label className="mb-1 block text-sm font-medium">
                        Confirmar contraseña
                    </label>
                    <input
                        type="password"
                        required
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    {verifyPassword && password !== verifyPassword && (
                        <p className="mt-1 text-xs text-red-600">
                            Las contraseñas no coinciden
                        </p>
                    )}
                </div>
                
                <div className="mb-4">
                    <button
                        type="submit"
                        disabled={loading || validationErrors.length > 0 || password !== verifyPassword}
                        className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Recuperando..." : "Recuperar"}
                    </button>
                </div>
                
                <div className="mb-6">
                    <button
                        type="button"
                        className="w-full rounded bg-gray-600 py-2 font-semibold text-white hover:bg-gray-700"
                        onClick={() => router.push('/signin')}
                    >
                        Atrás
                    </button>
                </div>
            </form>
            
            <ConfirmModal
                open={showErrorModal}
                message={errorModal.toString() || "Token inválido o expirado"}
                type="error"
                onAccept={() => router.push('/signin')}
            />
        </div>
    );
}