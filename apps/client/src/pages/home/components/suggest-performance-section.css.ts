import { style } from '@vanilla-extract/css';

export const boxWrapper = style({
  padding: '2rem 0 2rem 2rem',
});

export const container = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  gap: '1.2rem',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
});

export const cardWrapper = style({
  flexShrink: 0,
  width: '11.6rem',
  selectors: {
    '&:last-child': {
      marginRight: '2rem',
    },
  },
});
