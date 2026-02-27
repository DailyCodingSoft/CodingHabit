'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  ConfirmModal  from '@/components/ui/alert/alertLoginAndRegister';
import NeonInput from '@/components/ui/NeonInput';
import NeonFormContainer from '@/components/ui/NeonFormContainer';

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
      <div className="flex min-h-screen items-center justify-center bg-[var(--landing-bg)]">
        <NeonFormContainer protocol="REGISTER PROTOCOL" title="Registrar Usuario" onSubmit={register}>
          {error && (
            <p className="mb-4 rounded-sm bg-red-900/30 border border-red-500 p-3 text-sm text-red-400 font-mono">
              {error}
            </p>
          )}

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
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--neon-green)] hover:bg-[var(--neon-green-light)] text-[var(--landing-bg)] font-bold py-3 px-6 rounded-sm transition-all font-mono uppercase tracking-widest text-sm shadow-[0_0_20px_var(--neon-glow-soft)] hover:shadow-[0_0_30px_var(--neon-glow-mid)] disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>

            <button
              type="button"
              onClick={()=>router.push('/signin')}
              className="w-full bg-transparent border-2 border-[var(--neon-green-dark)] hover:border-[var(--neon-green)] text-[var(--neon-green)] font-bold py-3 px-6 rounded-sm transition-all font-mono uppercase tracking-widest text-sm hover:shadow-[0_0_15px_var(--neon-glow-subtle)]"
            >
              Atrás
            </button>
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