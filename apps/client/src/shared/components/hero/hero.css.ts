import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  position: 'relative',
  width: '100%',
  height: '23.9rem',
  overflow: 'hidden',
});

export const background = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: themeVars.zIndex.heroBackground,
});

export const backgroundOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: themeVars.zIndex.heroOverlay,
  background: 'linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)',
  backdropFilter: 'blur(2px)',
});

export const backButton = style({
  position: 'absolute',
  top: '1.2rem',
  left: '1.4rem',
  background: 'none',
  border: 'none',
  color: themeVars.color.white,
  zIndex: themeVars.zIndex.heroContent,
});

export const textWrapper = style({
  position: 'absolute',
  bottom: '2rem',
  left: '2rem',
  color: themeVars.color.white,
  zIndex: themeVars.zIndex.heroContent,
  maxWidth: '54%',
});

export const year = style({
  ...themeVars.fontStyles.title3_b_18,
  marginBottom: '0.9rem',
});

export const title = style({
  ...themeVars.fontStyles.title1_b_24,
  marginBottom: '0.4rem',
  wordBreak: 'keep-all',
});

export const poster = style({
  position: 'absolute',
  right: '2rem',
  bottom: '2rem',
  width: '11.4rem',
  aspectRatio: '11.4 / 16.2',
  objectFit: 'cover',
  borderRadius: '1rem',
  zIndex: themeVars.zIndex.heroContent,
});
