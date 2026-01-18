interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    //TO DO: crear estilos pal boton jajajjaj
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
