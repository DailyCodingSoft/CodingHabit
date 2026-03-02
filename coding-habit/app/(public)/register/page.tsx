'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  ConfirmModal  from '@/components/ui/alert/alertLoginAndRegister';

type AlertState = {
  message: string;
  type: "error" | "success" | "info";
};

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username,setUsername]= useState('');
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState('');
    const [messageAlert, setMessageAlert] = useState<AlertState|null>(null)
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('')
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
      setResult( data.Respuesta);
      console.log(result)
      if(!res.ok || data.status == '401'){
        setAlert(true)
        setMessageAlert({
          message: data.message,
          type: "error"
        })
        return
      }else{
        setAlert(true)
        setMessageAlert({
          message: "Registro Exitoso",
          type: "success"
        })
      }
    };
    return(
      <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] font-mono">
        <form
        onSubmit={register}
        className="w-full max-w-md rounded border-2 border-[var(--neon-green-dark)] bg-[var(--bg-card)] p-8 shadow-[0_0_20px_var(--neon-glow-faint)]"
      >
        <h1 className="mb-6 text-center text-2xl font-bold text-[var(--neon-green)] uppercase tracking-wider">
          Registrar Usuario
        </h1>

        {error && (
          <p className="mb-4 rounded border border-[var(--error-border)] bg-[var(--error-bg)] p-2 text-sm text-[var(--error-text)]">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-[var(--text-secondary)]">
            Nombre de usuario 
          </label>
          <input
            type="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--input-focus)] focus:shadow-[0_0_10px_var(--neon-glow-faint)]"
          />
        </div>

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

        <div className="mb-6">
          <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[var(--btn-primary-bg)] py-2 font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] disabled:opacity-50 transition-all"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
        </div>
        <div className="mb-6">
          <button
          type="button"
          className="w-full rounded border border-[var(--neon-green-dark)] bg-transparent py-2 font-semibold text-[var(--neon-green)] hover:bg-[var(--neon-glow-faint)] transition-all"
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
