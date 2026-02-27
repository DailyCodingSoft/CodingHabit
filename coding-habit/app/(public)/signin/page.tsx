'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NeonInput from '@/components/ui/NeonInput';

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--landing-bg)] px-4">
      <form
        onSubmit={login}
        className="relative bg-[var(--landing-bg)] border-2 border-[var(--neon-green)] rounded-sm p-8 w-full max-w-md shadow-[0_0_40px_var(--neon-glow-soft)]"
      >
        <div className="absolute -top-3 left-8 bg-[var(--landing-bg)] px-3 text-[var(--neon-green)] text-xs font-mono tracking-widest">
          &gt; LOGIN PROTOCOL
        </div>
        
        <h1 className="text-[var(--neon-green)] text-3xl font-bold tracking-wide text-center mb-8 font-mono uppercase">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-4 rounded-sm bg-red-900/30 border border-red-500 p-3 text-sm text-red-400 font-mono">
            {error}
          </p>
        )}

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
        </div>

        <div className="flex flex-col gap-4 pt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--neon-green)] hover:bg-[var(--neon-green-light)] text-[var(--landing-bg)] font-bold py-3 px-6 rounded-sm transition-all font-mono uppercase tracking-widest text-sm shadow-[0_0_20px_var(--neon-glow-soft)] hover:shadow-[0_0_30px_var(--neon-glow-mid)] disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={() => router.push('/register')}
            className="w-full bg-transparent border-2 border-[var(--neon-green-dark)] hover:border-[var(--neon-green)] text-[var(--neon-green)] font-bold py-3 px-6 rounded-sm transition-all font-mono uppercase tracking-widest text-sm hover:shadow-[0_0_15px_var(--neon-glow-subtle)]"
          >
            Registrar
          </button>
        </div>
      </form> 
    </div>
  );
}
