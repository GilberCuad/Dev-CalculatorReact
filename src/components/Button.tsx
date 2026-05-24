import { IButtonProps } from "../interfaces/buttonProps";
import '../styles/Button.css';

export function Button({ label, onClick, variant, wide = false }: IButtonProps) {
return (
    <button 
      className={`key key-${variant} ${wide ? 'key-wide' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}