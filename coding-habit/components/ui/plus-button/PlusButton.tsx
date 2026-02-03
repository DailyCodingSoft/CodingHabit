type PlusButtonProps = {
    onClick: () => void;
    isFixed?: boolean;
}

export default function PlusButton({onClick, isFixed = true}: PlusButtonProps) {
  const positionClass = isFixed ? 'fixed bottom-6 right-6 z-50' : '';
  
  return (
    <button
      onClick={onClick}
      className={`${positionClass} rounded-full bg-(--primary-light-color) border-2 border-black hover:bg-(--secondary-light-color) transition-colors duration-200 shadow-md shrink-0 w-[25px] h-[25px]`}
      aria-label="Add"
    >
      <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-black leading-none select-none -mt-[9px]">
        +
      </span>
    </button>
  );
};