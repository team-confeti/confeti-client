import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  padding: '2.4rem 2rem',
  gridColumnGap: '1.75rem',
  gridRowGap: '3rem',
});
