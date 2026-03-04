import Link from 'next/link';

interface NeonButtonProps {
  href: string;
  children: string;
}

export default function NeonButton({ href, children }: NeonButtonProps) {
  return (
    <Link href={href} className="btn-hero">
      {children}
    </Link>
  );
}
