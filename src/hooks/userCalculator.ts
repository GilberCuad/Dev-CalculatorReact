import { useState } from 'react';
import { Operator } from '../types/calculator';
import { ICalculatorState } from '../interfaces/calculatorState';

const INITIAL_STATE: ICalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  overwrite: false,
}

export const useCalculator = () => {
  const [state, setState] = useState<ICalculatorState>(INITIAL_STATE);

  // case: Add digit to current value
  const addDigit = (digit: string) => {
    setState(prev => {
      // Case: Overwrite current value with new digit after an operator has been selected   
      if (prev.overwrite) {
        return {
          ...prev,
          currentValue: digit,
          overwrite: false,
        }
      }

      // Case: Prevent multiple leading zeros
      if (prev.overwrite) {
        return { ...prev, currentValue: digit, overwrite: false };
      }

      // Case: Prevent multiple leading zeros followed by a non-zero digit
      if (digit === '.' && prev.currentValue.includes('.')) {
        return prev;
      }


      // case: Replace leading zero with new digit (except for decimal point)
      if (prev.currentValue === '0' && digit !== '.') {
        return { ...prev, currentValue: digit };
      }


      // Case: Append digit to current value
      return {
        ...prev,
        currentValue: prev.currentValue + digit,
      }
    })
  }



  // case: Select operator and prepare for next input
  const selectOperator = (op: Operator) => {
    setState(prev => ({
      ...prev,
      operator: op,
      previousValue: prev.currentValue,
      overwrite: true,
    }))
  }

  const calculate = () => {
    setState(prev => {

      const a = parseFloat(prev.previousValue);
      const b = parseFloat(prev.currentValue);

      if (isNaN(a) || isNaN(b) || !prev.operator) return prev; // No operator or previous value, do nothing

      // case: Perform calculation based on selected operator

      const operations: Record<NonNullable<Operator>, (a: number, b: number) => number> = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => b !== 0 ? a / b : 0, // Handle division by zero
        '%': (a, b) => b !== 0 ? a % b : 0, // Handle modulus by zero
      }

      const result = operations[prev.operator](a, b);
      const clean = parseFloat(result.toFixed(3).toString()); // Clean up floating point precision issues

      return {
        ...prev,
        currentValue: clean.toString(),
        previousValue: '',
        operator: null,
        overwrite: true,
      }
    })
  }

  // case: Clear calculator state
  const clear = () => {
    setState(INITIAL_STATE);
  }

  // case: Toggle sign of current value

  const toggleSign = () => {
    setState(prev => ({
      ...prev,
      currentValue: prev.currentValue.startsWith('-') ? prev.currentValue.slice(1) : `-${prev.currentValue}`
    })
    )
  }

  // case: Convert current value to percentage

  const percentage = () => {
    setState(prev => ({
      ...prev,
      currentValue: String(parseFloat(prev.currentValue) / 100),
    }))
  }

  // case: Return current state and action handlers for use in components
  return { state, addDigit, selectOperator, calculate, clear, toggleSign, percentage };

}