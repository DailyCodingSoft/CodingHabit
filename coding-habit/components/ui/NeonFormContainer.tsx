interface NeonFormContainerProps {
  protocol: string;
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  maxWidth?: 'md' | '2xl';
}

export default function NeonFormContainer({ protocol, title, children, onSubmit, maxWidth = 'md' }: NeonFormContainerProps) {
  const widthClass = maxWidth === '2xl' ? 'max-w-2xl' : 'max-w-md';
  
  return (
    <div className="flex justify-center px-4">
      <form
        onSubmit={onSubmit}
        className={`relative bg-[var(--landing-bg)] border-2 border-[var(--neon-green)] rounded-sm p-8 w-full ${widthClass} shadow-[var(--shadow-neon-2xl)]`}
      >
        <div className="absolute -top-3 left-8 bg-[var(--landing-bg)] px-3 text-[var(--neon-green)] text-xs font-mono tracking-widest">
          &gt; {protocol}
        </div>
        
        <h2 className="text-[var(--neon-green)] text-3xl font-bold tracking-wide text-center mb-8 font-mono uppercase">
          {title}
        </h2>

        {children}
      </form>
    </div>
  );
}
