import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
});

export const spinner = style({
  width: '4rem',
  height: '4rem',
  color: themeVars.color.slate900,
  animation: `${spin} 1s linear infinite`,
});
