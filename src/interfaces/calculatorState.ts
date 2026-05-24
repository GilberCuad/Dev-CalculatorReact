import { Operator } from '../types/calculator';

export interface ICalculatorState {
  currentValue: string;
  previousValue: string;
  operator: Operator;
  overwrite: boolean;
}