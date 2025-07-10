import { type ReactNode } from 'react';

import { cn } from '@confeti/utils';

import { buttonVariants } from './button.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'default' | 'add' | 'link' | 'logout' | 'kakao' | 'apple' | 'back';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

const Button = ({
  text,
  variant = 'default',
  disabled = false,
  className,
  icon,
  ...props
}: Props) => {
  return (
    <button
      className={cn(buttonVariants({ variant: variant, disabled }), className)}
      disabled={disabled}
      {...props}
    >
      {icon ? icon : null}
      {text}
    </button>
  );
};

export default Button;
