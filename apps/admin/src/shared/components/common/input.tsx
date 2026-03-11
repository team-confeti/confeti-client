import { ComponentPropsWithoutRef, ReactNode } from 'react';

import * as styles from './input.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  fullWidth?: boolean;
}

const Input = ({
  label,
  error,
  leftIcon,
  fullWidth = true,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          className={`${styles.input} ${leftIcon ? styles.withIcon : ''} ${error ? styles.error : ''} ${className || ''}`}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Input;
