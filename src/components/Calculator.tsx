import { useCalculator } from '../hooks/userCalculator';
import {Display} from './Display';
import { Button } from './Button';
import '../styles/Calculator.css';


export function Calculator() {
  const { state, addDigit, selectOperator, clear, calculate, toggleSign, percentage } = useCalculator();
 return (
   <div className="calculator">
     <Display
        currentValue={state.currentValue}
        previousValue={state.previousValue}
        operator={state.operator}
      /> 
  <div className="keypad">
        {/* Fila de funciones */}
        <Button label="AC"  variant="function" onClick={clear} />
        <Button label="+/-" variant="function" onClick={toggleSign} />
        <Button label="%"   variant="function" onClick={percentage} />
        <Button label="÷"   variant="operator" onClick={() => selectOperator('/')} />

        {/* Fila 7-8-9 */}
        <Button label="7" variant="number" onClick={() => addDigit('7')} />
        <Button label="8" variant="number" onClick={() => addDigit('8')} />
        <Button label="9" variant="number" onClick={() => addDigit('9')} />
        <Button label="×" variant="operator" onClick={() => selectOperator('*')} />

        {/* Fila 4-5-6 */}
        <Button label="4" variant="number" onClick={() => addDigit('4')} />
        <Button label="5" variant="number" onClick={() => addDigit('5')} />
        <Button label="6" variant="number" onClick={() => addDigit('6')} />
        <Button label="-" variant="operator" onClick={() => selectOperator('-')} />

        {/* Fila 1-2-3 */}
        <Button label="1" variant="number" onClick={() => addDigit('1')} />
        <Button label="2" variant="number" onClick={() => addDigit('2')} />
        <Button label="3" variant="number" onClick={() => addDigit('3')} />
        <Button label="+" variant="operator" onClick={() => selectOperator('+')} />

        {/* Última fila */}
        <Button label="0"  variant="number" onClick={() => addDigit('0')} wide />
        <Button label="."  variant="number" onClick={() => addDigit('.')} />
        <Button label="="  variant="equals" onClick={calculate} />
      </div>
    </div>
    )

}
