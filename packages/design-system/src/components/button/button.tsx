import type { ButtonHTMLAttributes } from 'react';
import { buttonStyle } from './button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'xLarge' | 'large' | 'medium';
  isDisabled?: boolean;
}

const Button = ({
  variant = 'primary',
  children,
  size = 'medium',
  isDisabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={buttonStyle({ color: variant, size: size })}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
