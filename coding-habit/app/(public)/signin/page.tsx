'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NeonInput from '@/components/ui/NeonInput';
import NeonFormContainer from '@/components/ui/NeonFormContainer';
import NeonButton from '@/components/ui/NeonButton';
import ErrorMessage from '@/components/ui/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setLoading(true);
    const emailSend = email.toLowerCase();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailSend, password: password }),
    })
    const data = await res.json()
    setLoading(false);
    if (!res.ok) {
      setError(data.message || 'Error al iniciar sesión');
      return
    } else {
      router.push('/user')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--landing-bg)]">
      <NeonFormContainer protocol="LOGIN PROTOCOL" title="Iniciar sesión" onSubmit={login}>
        {error && <ErrorMessage message={error} />}

        <div className="space-y-6">
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
          <button
            type="button"
            onClick={() => router.push('/recoverypassword')}
            className="mt-2 text-sm text-blue-600 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <div className="flex flex-col gap-4 pt-8">
          <NeonButton type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Entrar"}
          </NeonButton>

          <NeonButton variant="secondary" onClick={() => router.push('/register')}>
            Registrar
          </NeonButton>
        </div>
      </NeonFormContainer>
    </div>
  );
}
