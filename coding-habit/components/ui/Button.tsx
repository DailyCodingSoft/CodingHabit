interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-[var(--btn-primary-bg)] py-2 px-4 font-semibold text-[var(--btn-primary-text)] hover:bg-[var(--btn-primary-hover)] transition-colors duration-200"
    >
      {label}
    </button>
  );
};

export default Button;
