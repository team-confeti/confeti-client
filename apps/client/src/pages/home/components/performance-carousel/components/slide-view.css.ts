import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const slide = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  willChange: 'transform',
  pointerEvents: 'auto',
});

const posterBase = {
  position: 'relative' as const,
  width: '30rem',
  height: '39.8rem',
  borderRadius: '1rem',
  overflow: 'hidden',
  boxShadow: themeVars.shadowStyles.shadow_home_poster.boxShadow,
  flexShrink: 0,
  transformOrigin: 'center',
};

export const centerPoster = style({
  ...posterBase,
});

export const sidePoster = style({
  ...posterBase,
});

export const image = style({
  width: '100%',
  height: '100%',
  display: 'block',
  objectFit: 'cover',
});

export const blackGradient = style({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  width: '30rem',
  height: '20rem',
  background: themeVars.color.black_grad,
  pointerEvents: 'none',
});

export const infoWrap = style({
  position: 'absolute',
  left: '2rem',
  right: '2rem',
  bottom: '2rem',
  ...themeVars.display.flexColumn,
  color: themeVars.color.white,
});

export const title = style({
  ...themeVars.fontStyles.title1_b_24,
  marginBottom: '1.6rem',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
});

export const place = style({
  ...themeVars.fontStyles.body3_m_14,
});

export const date = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.gray400,
});

export const dateIndicatorRow = style({
  ...themeVars.display.flexBetweenAlignCenter,
});

export const sideOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(255,255,255,0.30)',
  pointerEvents: 'none',
});

export const chipWrapper = style({
  position: 'absolute',
  top: '2rem',
  left: '2rem',
  zIndex: themeVars.zIndex.poster.infoText,
});
