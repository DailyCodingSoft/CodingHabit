'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </p>
        )}

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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={() => router.push('/user')}
        >
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
