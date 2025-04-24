import { style } from '@vanilla-extract/css';

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const content = style({
  flex: 1,
});

export const buttonWrapper = style({
  marginTop: '12.1rem',
  padding: '2rem',
});
