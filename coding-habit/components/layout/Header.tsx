export default function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      {/* Izquierda */}
      <div className="flex items-center gap-3">
        <span className="font-semibold">Mi App</span>
      </div>

      {/* Derecha */}
      <nav className="flex gap-4">
        <button>Dashboard</button>
        <button>Perfil</button>
        <button>Cerrar sesión</button>
      </nav>
    </header>
  );
}
