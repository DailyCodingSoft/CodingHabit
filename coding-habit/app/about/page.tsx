export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        Coding Habit Info
      </h1>
      <div className="mb-6">
        Empresa dedicada a realizar los mejores proyectos que se te puedan ocurrir.
        En esta ocasión se tiene la info del equipo.
      </div>
      <div className="lex flex-row bg-red-500">
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