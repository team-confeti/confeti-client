import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  height: '100vh',
});

export const content = style({
  flex: 1,
  padding: '2rem',
  overflowY: 'auto',
});
