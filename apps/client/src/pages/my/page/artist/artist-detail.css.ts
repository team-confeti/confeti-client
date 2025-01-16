import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '2.4rem 3rem',
  gap: '3.8rem',
  gridRowGap: '3rem',
});
