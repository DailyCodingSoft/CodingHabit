interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (

    <button
      onClick={onClick}
      className="rounded bg-[var(--primary-color)] py-2 px-4 font-semibold text-[var(--light-text-color)] hover:bg-[var(--primary-hover-color)] transition-colors"
      style={{ transitionDuration: 'var(--transition-fast)' }}
    >
      {label}
    </button>
  );
};

export default Button;
