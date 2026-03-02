'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();   
    const emailSend = email.toLowerCase();
    const res = await fetch('/api/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: emailSend, password:password }),
    })
    const data = await res.json()
    if(!res.ok){
      console.error('Error'+data.messaage)
      return
    }else{
      router.push('/user')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] font-mono">
      <form
        onSubmit={login}
        className="w-full max-w-md rounded border-2 border-[var(--neon-green-dark)] bg-[var(--bg-card)] p-8 shadow-[0_0_20px_var(--neon-glow-faint)]"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-[var(--neon-green)] uppercase tracking-wider">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-4 rounded border border-[var(--error-border)] bg-[var(--error-bg)] p-2 text-sm text-[var(--error-text)]">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Correo electrónico
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--input-focus)] focus:shadow-[0_0_10px_var(--neon-glow-faint)]"
          />
        </div>

        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Contraseña
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--input-focus)] focus:shadow-[0_0_10px_var(--neon-glow-faint)]"
          />
        </div>

        <div className="mb-5">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-[var(--btn-primary-bg)] py-2 font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 transition-all"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </div>

        <div className="mb-5">
          <button
            type="button"
            className="w-full rounded border border-[var(--neon-green-dark)] bg-transparent py-2 font-semibold text-[var(--neon-green)] hover:bg-[var(--neon-glow-faint)] transition-all"
            onClick={() => router.push('/register') }
          >
            Registrar
          </button>
        </div>
      </form> 
    </div>
  );
}
