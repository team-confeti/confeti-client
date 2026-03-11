import { ReactNode } from 'react';

import * as styles from './badge.css';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

const Badge = ({ children, variant = 'neutral' }: BadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>
  );
};

export default Badge;
