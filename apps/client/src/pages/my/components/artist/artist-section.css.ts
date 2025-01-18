import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '3.2rem',
  margin: '0.8rem 0 1.2rem 0',
});
