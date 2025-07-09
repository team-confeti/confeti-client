import { HTMLAttributes } from 'react';

import { cn } from '@confeti/utils';

import * as styles from './skeleton.css';

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  variants?: 'default' | 'rounded' | 'rectangular';
  width?: string;
  height?: string;
}

const Skeleton = ({
  width,
  height,
  variants = 'default',
  style,
  ...rest
}: SkeletonProps) => {
  return (
    <span
      className={cn(styles.skeleton({ variants }))}
      style={{
        width,
        height,
        ...style,
      }}
      {...rest}
    />
  );
};

export default Skeleton;
