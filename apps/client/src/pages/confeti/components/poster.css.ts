import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  marginTop: '2rem',
});

export const posterBg = style({
  width: '100%',
  position: 'absolute',
});

export const poster = style({
  zIndex: 1,
});
