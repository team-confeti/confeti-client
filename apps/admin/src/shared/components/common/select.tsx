import { ComponentPropsWithoutRef } from 'react';

import * as styles from './select.css';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Select = ({
  label,
  error,
  fullWidth = true,
  className,
  children,
  ...props
}: SelectProps) => {
  return (
    <div className={`${styles.container} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={`${styles.select} ${error ? styles.error : ''} ${className || ''}`}
        {...props}
      >
        {children}
      </select>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};

export default Select;
