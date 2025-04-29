import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const fadeInOut = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 0.5 },
  '100%': { opacity: 1 },
});

export const bannerTextWrapper = style({
  position: 'absolute',
  top: '26.6rem',
  left: '2.5rem',
  marginTop: '3rem',
  height: '10.3rem',
  width: 'calc(100% - 5rem)',
  zIndex: themeVars.zIndex.poster.content,
});

export const titleDate = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.gray400,
  animation: `${fadeInOut} 1s ease-out forwards`,
});

export const titleName = style({
  ...themeVars.fontStyles.title1_b_24,
  color: themeVars.color.white,
  marginBottom: '1.6rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  animation: `${fadeInOut} 1s ease-out forwards`,
});

export const titleSub = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.white,
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
  position: 'relative',
  width: '30rem',
  height: '100%',
  flexShrink: '0',
  padding: '0 0.5rem',
});

export const infoOverlay = style({
  position: 'absolute',
  bottom: '0rem',
  borderRadius: '1rem',
});

export const dots = style({
  width: '100%',
  display: 'flex',
  justifyItems: 'center',
  textAlign: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.6rem 0',
});

export const badge = style({
  position: 'absolute',
  top: '26.6rem',
  left: '2.5rem',
  padding: '0.4rem 0.8rem',
  backgroundColor: themeVars.color.black_op,
  color: themeVars.color.confeti_lime,
  border: `0.5px solid ${themeVars.color.confeti_lime}`,
  borderRadius: '13px',
  zIndex: themeVars.zIndex.poster.infoText,
});

export const carouselContainer = style({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
