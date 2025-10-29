import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexAlignCenter,
  position: 'fixed',
  backgroundColor: 'transparent',
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)', // 앱의 최대 너비 제한 적용
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: 20,
});

export const containerScrolled = style({
  ...themeVars.display.flexAlignCenter,
  position: 'fixed',
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)', // 앱의 최대 너비 제한 적용
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: 20,
});

export const blurBackground = style({
  position: 'absolute',
  inset: 0,
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(10px)',
  // backgroundColor: 'rgba(255, 255, 255, 0.65)', // 불투명도 증가 (0.25 -> 0.65)
  maskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
  transition: 'opacity 0.3s ease',
  pointerEvents: 'none',
  zIndex: -1,
});

export const containerWhite = style({
  ...themeVars.display.flexAlignCenter,
  position: 'fixed',
  backgroundColor: themeVars.color.white,
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)', // 앱의 최대 너비 제한 적용
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: 20,
});

export const containerSticky = style({
  ...themeVars.display.flexAlignCenter,
  position: 'sticky',
  backgroundColor: themeVars.color.white,
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)', // 앱의 최대 너비 제한 적용
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: 20,
});

export const logo = style({
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  position: 'relative',
  zIndex: 1,
});

export const button = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});
