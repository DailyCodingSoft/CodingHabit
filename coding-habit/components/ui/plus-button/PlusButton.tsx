type PlusButtonProps = {
    onClick: () => void;
}

export default function PlusButton({onClick}: PlusButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-(--primary-light-color) border-2 border-black hover:bg-(--secondary-light-color) transition-colors duration-200 shadow-md shrink-0"
      style={{ width: '50px', height: '50px', minWidth: '50px', minHeight: '50px', maxWidth: '50px', maxHeight: '50px' }}
      aria-label="Add"
    >
      <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-black leading-none select-none" style={{ marginTop: '-12px' }}>
        +
      </span>
    </button>
  );
};