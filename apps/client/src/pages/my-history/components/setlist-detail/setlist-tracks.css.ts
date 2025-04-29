import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';
export const wrapper = style({
  padding: '0 2rem 2rem 2rem',
});

export const addMusicWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '1rem 0',
  width: '100%',
});

export const addIconBox = style({
  width: '6.8rem',
  height: '6.8rem',
  padding: '1.9rem',
  backgroundColor: themeVars.color.gray300,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.5rem',
  flexShrink: 0,
});

export const addText = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray500,
});
