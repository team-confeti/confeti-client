import { keyframes, style } from '@vanilla-extract/css';

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
  color: '#6366F1',
  animation: `${spin} 1s linear infinite`,
});
