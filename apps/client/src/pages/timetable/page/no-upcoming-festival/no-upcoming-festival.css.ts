import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexJustifyAlignCenter,
  flexDirection: 'column',
  gap: '5rem',
  flex: '1',
  padding: '0 2rem',
});

export const container = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '3rem',
});

export const textWrapper = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '0.6rem',
});

export const mainText = style({
  color: themeVars.color.black,
  ...themeVars.fontStyles.title3_b_18,
});

export const subText = style({
  color: themeVars.color.gray500,
  ...themeVars.fontStyles.body2_r_15,
});

export const buttonText = style({
  color: themeVars.color.confeti_lime3,
  ...themeVars.fontStyles.body3_m_14,
  textDecoration: 'underline',
  textDecorationColor: themeVars.color.confeti_lime3,
  textDecorationThickness: '1px',
  textUnderlineOffset: '0.13em',
  cursor: 'pointer',
});

export const buttonSection = style({
  padding: '2rem',
});
