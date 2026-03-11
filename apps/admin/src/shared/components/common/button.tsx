import { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as styles from './button.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: ButtonProps) => {
  const classes = [styles.button, styles[variant], styles[size]];
  if (className) classes.push(className);
  const buttonClass = classes.join(' ');

  return (
    <button className={buttonClass} {...props}>
      {leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={styles.iconRight}>{rightIcon}</span>}
    </button>
  );
};

export default Button;
