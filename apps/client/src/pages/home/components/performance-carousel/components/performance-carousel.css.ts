import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  width: '100%',
  overflow: 'visible',
  userSelect: 'none',
  touchAction: 'none',
  marginTop: '8rem',
});

export const carouselTrack = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'visible',
});
