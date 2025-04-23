import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',

  // 헤더 높이 제외
  height: 'calc( 100dvh - 5rem )',
});

export const festivalSelectorWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  position: 'relative',
  width: '100%',
  height: '13.8rem',
  padding: '1.6rem 2rem',
});

export const festivalButtonsWrapper = style({
  display: 'flex',
  gap: '1.4rem',
  overflow: 'scroll',
});

export const buttonContainer = style({
  padding: '2rem',
});

export const buttonStyle = style({
  color: themeVars.color.black,
  height: '5rem',
});

export const modalText = style({
  color: themeVars.color.confeti_lime3,
});

export const checkBox = style({
  appearance: 'none',
});

export const festivalButtonBox = style({
  position: 'relative',
});

export const checkboxBase = style({
  position: 'absolute',
  top: '1rem',
  right: '0',
  width: '2.2rem',
  height: '2.2rem',
});
