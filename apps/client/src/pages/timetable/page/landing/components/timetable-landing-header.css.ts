import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const heroSection = style({
  position: 'relative',
  width: '100%',
  height: '31.6rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  overflow: 'hidden',
});

export const backgroundLayer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  zIndex: 0,
});

export const blurOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(2px)',
  zIndex: 1,
});

export const heroContent = style({
  position: 'relative',
  zIndex: 2,
  ...themeVars.display.flexColumn,
  justifyContent: 'space-between',
  flex: 1,
  padding: '0 2rem 4rem',
  boxSizing: 'border-box',
});

export const titleSection = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
  marginTop: '12rem',
});

export const mainTitle = style({
  ...themeVars.fontStyles.title1_b_24,
  color: themeVars.color.white,
  margin: 0,
});

export const ctaSection = style({
  width: '100%',
  ...themeVars.display.flexColumn,
  gap: '1.2rem',
});

export const newTimetableButton = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  height: 'auto',
  padding: '1rem',
});
