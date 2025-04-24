import { style } from '@vanilla-extract/css';

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  columnGap: '1.6rem',
});
