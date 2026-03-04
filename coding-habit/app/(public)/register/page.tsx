'use client'

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import  ConfirmModal  from '@/components/ui/alert/alertLoginAndRegister';
import NeonInput from '@/components/ui/NeonInput';
import NeonFormContainer from '@/components/ui/NeonFormContainer';
import NeonButton from '@/components/ui/NeonButton';
import ErrorMessage from '@/components/ui/ErrorMessage';

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--landing-bg)]">
      <NeonFormContainer protocol="REGISTER PROTOCOL" title="Registrar Usuario" onSubmit={register}>
          {error && <ErrorMessage message={error} />}
          
        <h1 className="mb-6 text-center text-2xl font-bold">
          Registrar Usario
        </h1>

          <div className="space-y-6">
            <NeonInput
              name="username"
              type="text"
              label="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <NeonInput
              name="email"
              type="email"
              label="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <NeonInput
              name="password"
              type="password"
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-4 pt-8">
            <NeonButton type="submit" disabled={loading}>
              {loading ? "Registrando..." : "Registrar"}
            </NeonButton>

            <NeonButton variant="secondary" onClick={()=>router.push('/signin')}>
              Atrás
            </NeonButton>
          </div>
        </NeonFormContainer>
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