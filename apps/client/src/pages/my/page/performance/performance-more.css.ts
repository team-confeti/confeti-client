import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '1rem 2rem',
  gridColumnGap: '1.75rem',
  gridRowGap: '3rem',
});

export const chipList = style({
  display: 'flex',
  gap: '1rem',
  padding: '1.6rem 2rem',
});
