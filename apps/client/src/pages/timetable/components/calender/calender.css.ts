import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({});

export const imageWrapper = style({
  position: 'relative',
  width: '100%',
  height: '8.3rem',
});

export const calendarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const overlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: themeVars.zIndex.heroOverlay,
  background: themeVars.color.black_grad,
  backdropFilter: 'blur(10px)',
});

export const dateInfoWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: themeVars.zIndex.heroContent,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2.4rem',
});

export const dateInfo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.2rem',
  minWidth: '7.8rem',
});

export const dateText = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.confeti_lime,
});

export const dayText = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.white,
  fontVariantNumeric: 'tabular-nums',
  wordSpacing: '-0.2rem',
});

export const navButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  background: themeVars.color.white_op_10,
  border: 'none',
  cursor: 'pointer',
});

export const navButtonPlaceholder = style({
  width: '3rem',
  height: '3rem',
});
