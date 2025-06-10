import React from 'react';

import type { IconName } from '../icon-list';

import { sprIcon } from './icon.css';

type IconProps = {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  rotate?: 90 | 180 | 270;
};

export const Icon = ({
  name,
  size,
  width,
  height,
  color,
  className,
  rotate,
}: IconProps) => {
  const computedWidth = width ?? size ?? 24;
  const computedHeight = height ?? size ?? 24;

  const rotateClass =
    rotate === 90
      ? sprIcon.rotate90
      : rotate === 180
        ? sprIcon.rotate180
        : rotate === 270
          ? sprIcon.rotate270
          : '';

  const combinedClass = [sprIcon.base, rotateClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      width={
        typeof computedWidth === 'number' ? `${computedWidth}px` : computedWidth
      }
      height={
        typeof computedHeight === 'number'
          ? `${computedHeight}px`
          : computedHeight
      }
      className={combinedClass}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
