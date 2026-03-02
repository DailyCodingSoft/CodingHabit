'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/ui/alert/alertLoginAndRegister';

type AlertState = {
  message: string;
  type: "error" | "success" | "info";
};

const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: true,
}
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState('');
  const [messageAlert, setMessageAlert] = useState<AlertState | null>(null)
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('')
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const router = useRouter();

  const validatePassword = (pwd: string) => {
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
    return errors;
  };

  useEffect(() => {
    if (password) {
      setValidationErrors(validatePassword(password));
    } else {
      setValidationErrors([]);
    }
  }, [password]);


  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un correo válido');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    const emailSend = email.toLowerCase();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailSend, password: password, username: username })
    })
    const data = await res.json();
    setLoading(false);
    setResult(data.Respuesta);
    if (!res.ok || data.status == '401') {
      setAlert(true)
      setMessageAlert({
        message: data.message,
        type: "error"
      })
      return
    } else {
      setAlert(true)
      setMessageAlert({
        message: "Registro Exitoso",
        type: "success"
      })
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={register}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Registrar Usario
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            Nombre de usuario
          </label>
          <input
            type="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium">
            Correo electrónico
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
          <label className="mb-1 block text-sm font-medium">
            Contraseña
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {password && (
            <div className="mt-2 space-y-1">
              <p className={`text-xs ${password.length >= 8 ? 'text-green-600 line-through' : 'text-red-600'}`}>
                • Mínimo 8 caracteres
              </p>
              <p className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600 line-through' : 'text-red-600'}`}>
                • Al menos una mayúscula
              </p>
              <p className={`text-xs ${/[a-z]/.test(password) ? 'text-green-600 line-through' : 'text-red-600'}`}>
                • Al menos una minúscula
              </p>
              <p className={`text-xs ${/\d/.test(password) ? 'text-green-600 line-through' : 'text-red-600'}`}>
                • Al menos un número
              </p>
              <p className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'text-green-600 line-through' : 'text-red-600'}`}>
                • Al menos un carácter especial
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium">
            Valida la Contraseña
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {confirmPassword && (
            <p className={`mt-2 text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
              {password === confirmPassword ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
            </p>
          )}
        </div>

        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
        <div className="mb-6">
          <button
            className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            onClick={() => router.push('/signin')}
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