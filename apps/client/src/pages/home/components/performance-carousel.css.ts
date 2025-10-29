import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

const RADIUS = '10px';
const SHADOW = '0 16px 40px rgba(0,0,0,0.35)';

export const root = style({
  position: 'relative',
  width: '100%',
  overflow: 'visible',
  userSelect: 'none',
  touchAction: 'pan-y',
  marginTop: '8rem',
});

export const carouselTrack = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'visible',
});

export const slide = style({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  willChange: 'transform',
  pointerEvents: 'auto',
});

export const centerPoster = style({
  position: 'relative',
  width: '30rem',
  height: '39.8rem',
  borderRadius: RADIUS,
  overflow: 'hidden',
  boxShadow: SHADOW,
  flexShrink: 0,
  transformOrigin: 'center',
});

export const sidePoster = style({
  position: 'relative',
  width: '300px',
  height: '398px',
  borderRadius: RADIUS,
  overflow: 'hidden',
  boxShadow: SHADOW,
  flexShrink: 0,
  transformOrigin: 'center',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
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
  display: 'flex',
  flexDirection: 'column',
  color: themeVars.color.white,
});

export const title = style({
  ...themeVars.fontStyles.title1_b_24,
  marginBottom: '1.6rem',
  overflowWrap: 'break-word',
  wordBreak: 'keep-all',
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
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const sideOverlay = style({
  position: 'absolute',
  inset: 0,
  background: 'rgba(255,255,255,0.30)',
  pointerEvents: 'none',
});
