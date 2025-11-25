import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexAlignCenter,
  padding: '1.75rem 2rem',
  gap: '2.4rem',
  backgroundColor: themeVars.color.gray100,
});

export const info = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const sectionWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '0.2rem',
});

export const titleWrapper = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});

export const title = style({
  ...themeVars.fontStyles.name_b_18,
  textDecorationStyle: 'wavy',
  textDecorationColor: themeVars.color.confeti_lime,
  textDecorationSkipInk: 'none',
  textDecorationLine: 'underline',
  textDecorationThickness: 1.89,
  lineHeight: '1.4',
});

export const description = style({
  marginBottom: '0.1rem',
  ...themeVars.fontStyles.subtitle1_m_18,
});
