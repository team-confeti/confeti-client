import React from 'react';

import { themeVars } from '@confeti/design-system/styles';

import type { IconName } from '../icon-list';

import { sprIcon } from './icon.css';

type IconColor = keyof typeof themeVars.color;

export type IconWeight = 'regular' | 'fill';

const ICON_WEIGHTS = [
  'regular',
  'fill',
] as const satisfies readonly IconWeight[];

type IconProps = {
  name: IconName;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: IconColor;
  weight?: IconWeight;
  className?: string;
  rotate?: 90 | 180 | 270;
} & React.SVGProps<SVGSVGElement>;

const buildWeightVars = (weight: IconWeight): React.CSSProperties => {
  const vars: Record<string, string> = {};
  for (const w of ICON_WEIGHTS) {
    vars[`--icon-w-${w}`] = w === weight ? 'inline' : 'none';
  }
  return vars as React.CSSProperties;
};

export const Icon = ({
  name,
  size,
  width,
  height,
  color,
  weight = 'regular',
  className,
  rotate,
  ...rest
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

  const mergedStyle: React.CSSProperties = {
    ...(color ? { color: themeVars.color[color] } : undefined),
    ...buildWeightVars(weight),
    ...rest.style,
  };

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
      aria-hidden="true"
      {...rest}
      style={mergedStyle}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
