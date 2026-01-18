"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <h1>Coding Habit 🤑</h1>
      <p>
        Una plataforma que permite a los usuarios crear juegos de hábitos usando
        su trabajo, como crear un compromiso cada día.
      </p>
      <p>aqui la deuda de cada uno jaja</p>
      <Button label="(CLICK AQUI )ESTO ES UN BOTON JAJA Deuda" onClick={() => router.push("/debt")}/>
    </>
  );
}
