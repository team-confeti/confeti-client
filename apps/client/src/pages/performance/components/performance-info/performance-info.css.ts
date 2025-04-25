import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2.4rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const wrapper = style({
  ...themeVars.display.flexColumn,
});

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  marginBottom: '1.9rem',
});

export const sectionTitle = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
});

export const detail = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
});

export const detailItem = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.2rem',
  width: '100%',
});

export const detailTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const detailContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});

export const likeButton = style({
  width: '7.4%',
  height: '7.4%',
});
