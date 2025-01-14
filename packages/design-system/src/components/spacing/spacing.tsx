import type { HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { spacingVariants } from './spacing.css';

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'gray' | 'white';
  children?: never;
}

export default function Spacing({
  size = 'md',
  color = 'gray',
  className,
  ...props
}: Props) {
  return (
    <div
      className={cn(spacingVariants({ size, color }), className)}
      {...props}
    />
  );
}
