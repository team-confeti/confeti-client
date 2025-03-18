import { keyframes, style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

export const fadeInOut = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const bannerTitle = style({
  marginTop: '3rem',
  height: '10.3rem',
});

export const titleDate = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.white,
  textAlign: 'center',
  marginBottom: '1.2rem',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

export const titleName = style({
  ...themeVars.fontStyles.title1_b_24,
  color: themeVars.color.white,
  textAlign: 'center',
  marginBottom: '4px',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

export const titleSub = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  textAlign: 'center',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

export const card = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
  boxShadow: '0px 3px 6px 1px rgba(0, 0, 0, 0.25)',
  outline: 'none !important',
  WebkitTapHighlightColor: 'transparent',
});

export const slideOverlay = style({
  position: 'absolute',
  top: '0',
  borderRadius: '1rem',
});

export const imgDiv = style({
  width: '30rem',
  height: '100%',
  flexShrink: '0',
  padding: '0 0.5rem',
});
