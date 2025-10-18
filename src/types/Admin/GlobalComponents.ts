import type { MouseEvent, ReactNode } from "react";


export interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
