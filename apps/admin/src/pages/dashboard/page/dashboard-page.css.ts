import { style } from '@vanilla-extract/css';

export const container = style({});

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '2.4rem',

  '@media': {
    '(min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '(min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});
