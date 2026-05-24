import { ButtonVariant } from "../types/buttonVariant";

export interface IButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
  wide?: boolean;
}