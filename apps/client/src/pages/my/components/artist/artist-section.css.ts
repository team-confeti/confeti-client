import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
  alignItems: 'center',
  gap: '3.2rem',
  margin: '0.8rem 0 0rem 0',
});
