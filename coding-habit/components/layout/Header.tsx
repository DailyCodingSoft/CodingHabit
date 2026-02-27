export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--landing-bg)]/80 backdrop-blur-md border-b border-[var(--neon-green-dark)] flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <span className="text-[var(--neon-green)] font-bold text-xl font-mono">Mi App</span>
      </div>

      <nav className="flex gap-6">
        <button className="text-[var(--neon-green-muted)] hover:text-[var(--neon-green)] transition-colors font-mono">
          Dashboard
        </button>
        <button className="text-[var(--neon-green-muted)] hover:text-[var(--neon-green)] transition-colors font-mono">
          Perfil
        </button>
        <button className="text-[var(--neon-green-muted)] hover:text-[var(--neon-green)] transition-colors font-mono">
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}
