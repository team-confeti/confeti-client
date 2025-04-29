import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const addIconBox = style({
  ...themeVars.display.flexJustifyAlignCenter,
  width: '6.8rem',
  height: '6.8rem',
  padding: '1.9rem',
  backgroundColor: themeVars.color.gray300,
  borderRadius: '0.5rem',
  flexShrink: 0,
});

export const addText = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray500,
});

export const highlightText = style({
  color: themeVars.color.confeti_lime3,
  marginRight: '0.4rem',
});

export const addMusicWrapper = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.6rem',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '1rem 0',
  width: '100%',
});
