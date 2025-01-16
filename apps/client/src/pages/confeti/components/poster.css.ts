import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export const posterBg = style({
  width: '100%',
  position: 'relative',
});

export const poster = style({
  zIndex: 1,
  position: 'absolute',
});
