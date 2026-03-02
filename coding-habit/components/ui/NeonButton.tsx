import Link from 'next/link';

interface NeonButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function NeonButton({ children, href, type = 'button', onClick, disabled, variant = 'primary' }: NeonButtonProps) {
  const baseClasses = "w-full font-bold py-3 px-6 rounded-sm transition-all font-mono uppercase tracking-widest text-sm";
  
  const variantClasses = variant === 'primary'
    ? "bg-[var(--neon-green)] hover:bg-[var(--neon-green-light)] text-[var(--landing-bg)] shadow-[0_0_20px_var(--neon-glow-soft)] hover:shadow-[0_0_30px_var(--neon-glow-mid)] disabled:opacity-50"
    : "bg-transparent border-2 border-[var(--neon-green-dark)] hover:border-[var(--neon-green)] text-[var(--neon-green)] hover:shadow-[0_0_15px_var(--neon-glow-subtle)]";

  const className = `${baseClasses} ${variantClasses}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
