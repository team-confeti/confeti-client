import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexAlignCenter,
  padding: '3rem 2rem',
  gap: '1.8rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
});

export const titleWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const profileLink = style({
  ...themeVars.fontStyles.body4_m_13,
  ...themeVars.display.flexAlignCenter,
  color: themeVars.color.gray500,
  gap: '0.4rem',
  cursor: 'pointer',
});
