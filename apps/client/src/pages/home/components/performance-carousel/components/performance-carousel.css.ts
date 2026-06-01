import { style } from '@vanilla-extract/css';

export const root = style({
  position: 'relative',
  width: '100%',
  overflow: 'visible',
  userSelect: 'none',
  touchAction: 'none',
  marginTop: '3.6rem',
  selectors: {
    '.cap-native &': {
      marginTop: 'calc(3.6rem + var(--safe-area-top))',
    },
  },
});

export const carouselTrack = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'visible',
});
