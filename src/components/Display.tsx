import { IDisplayProps } from "../interfaces/displayCalculator";
import '../styles/Display.css';

export function Display({ currentValue, previousValue, operator }: IDisplayProps) { 
  return (
    <div className="display">
      <div className="expression">
        {previousValue && operator ? `${previousValue} ${operator}` : ''}
      </div>
      <div className="current-value">{currentValue}</div>
    </div>
  )
}