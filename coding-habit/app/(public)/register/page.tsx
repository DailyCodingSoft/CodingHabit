'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername]= useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const register = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const emailSend = email.toLowerCase();
      const res = await fetch('/api/auth/register',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailSend, password:password, username:username})
      })
      const data = await res.json();
      console.log('Respuesta: ',data)
      if(!res.ok){
        console.error('Error'+data.messaage)
        return
      }else{
        router.push('/signin')
      }
    };
    return(
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
          onClick={()=>router.push('/signin')}
        >
          Atras
        </button>
        </div>
      </form>
    </div>
    );
}