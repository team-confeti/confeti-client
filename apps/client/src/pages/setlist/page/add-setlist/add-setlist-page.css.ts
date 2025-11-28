import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

export const searchBarContainer = style({
  padding: '0 2rem 0 2rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});
