import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

import { cn } from '@confeti/utils';

import * as styles from './collapse.css';

interface CollapseProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  children: ReactNode;
  isExpanded: boolean;
}

const Collapse = ({
  children,
  className,
  isExpanded,
  ...props
}: CollapseProps) => {
  return (
    <div className={cn(styles.root({ isExpanded }), className)} {...props}>
      <div className={styles.content({ isExpanded })}>{children}</div>
    </div>
  );
};

export default Collapse;
