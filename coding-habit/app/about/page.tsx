export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2 text-center">
        Coding Habit Info
      </h1>
      <div className="mb-6">
        Pequeño proyecto que nació con el objetivo de desarrollar destresas y habilidades 
        desarrollando un proyecto que nace de la idea de mmonitorear los cambios  
        y tiempo que realiza cada uno de los integrantes.
      </div>
      <h1>Integrantes</h1>
      <div className="flex flex-row bg-red-500">
        <div className="border p-4 flex-1 text-center">
          <h2 className="text-xl font-semibold">Sebastian Lopez</h2>
          <p>Ingeniero Graduado en agosto de 2026</p>
        </div>

        <div className="border p-4 flex-1 text-center">
          <h2 className="text-xl font-semibold">David Rivera</h2>
          <p>Ingeniero Graduado en octubre de 2026</p>
        </div>

        <div className="border p-4 flex-1 text-center">
          <h2 className="text-xl font-semibold">Cristian Vargas</h2>
          <p>Ingeniero Graduado en agosto de 2025</p>
        </div>

      </div>
    </>
  );
}