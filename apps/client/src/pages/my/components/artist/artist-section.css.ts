import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  justifyItems: 'center',
  alignItems: 'center',
  gap: '3.2rem',
  marginTop: '3.2rem',
});
