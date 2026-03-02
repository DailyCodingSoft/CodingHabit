const FOOTER_LINKS = ['About', 'Blog', 'Documentation', 'Privacy', 'Terms', 'Contact'];

export default function Footer() {
  return (
    <footer className="footer-glow landing-section bg-[var(--landing-bg-alt)] border-t-2 border-[var(--neon-green)] px-10 py-10 text-center">
      <div className="landing-container">
        <div className="flex justify-center gap-10 mb-8 flex-wrap">
          {FOOTER_LINKS.map((link) => (
            <a key={link} href="#" className="neon-link text-[13px] tracking-wide">{link}</a>
          ))}
        </div>
        <p className="text-xs text-[var(--neon-green-dark)] tracking-wide">
          © 2026 CODING HABIT. All systems operational.
        </p>
      </div>
    </footer>
  );
}
