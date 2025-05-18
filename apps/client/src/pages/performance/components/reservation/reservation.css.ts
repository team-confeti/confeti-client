import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '3rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const title = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
  marginBottom: '1.6rem',
});

export const list = style({
  display: 'flex',
  gap: '2rem',
});

export const item = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '0.8rem',
});

export const logoButton = style({
  ...themeVars.display.flexJustifyAlignCenter,
  width: '6rem',
  height: '6rem',
  aspectRatio: '1/1',
  borderRadius: '3rem',
  border: themeVars.border.lime3,
  overflow: 'hidden',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  padding: 0,
});

export const logo = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
  transform: 'scale(1.03)',
});

export const name = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
  textAlign: 'center',
});
