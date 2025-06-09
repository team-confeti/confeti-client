import React from 'react';

import type { IconName } from './icon-list'; // 자동 생성된 타입 import

type IconProps = {
  name: IconName; // string → IconName (오타 방지!)
  size?: number;
  color?: string;
  className?: string;
};

export const Icon = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
}: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      fill={color}
      aria-hidden="true"
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};
