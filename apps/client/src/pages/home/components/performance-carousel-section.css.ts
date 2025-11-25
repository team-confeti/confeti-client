import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const sectionContainer = style({
  position: 'relative',
  width: '100%',
  height: '56.4rem',
  overflow: 'hidden',
  marginTop: 0,
});

export const backgroundWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: themeVars.zIndex.carousel.background,
});

export const backgroundImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(13px)',
  transform: 'scale(1.1)',
});

export const backgroundImageFront = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(13px)',
  transform: 'scale(1.1)',
  zIndex: themeVars.zIndex.carousel.backgroundFront,
});

export const backgroundOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: themeVars.color.gray_op,
  zIndex: themeVars.zIndex.carousel.overlay,
});

export const carouselWrapper = style({
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'relative',
  zIndex: themeVars.zIndex.carousel.content,
  height: '100%',
});
