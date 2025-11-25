import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexAlignCenter,
  backgroundColor: themeVars.color.gray100,
  padding: '3rem 2rem',
  gap: '1.8rem',
});

export const profileWrapper = style({
  position: 'relative',
});

export const editIcon = style({
  ...themeVars.shadowStyles.shadow_toast,
  backgroundColor: themeVars.color.white,
  border: themeVars.border.gray200,
  position: 'absolute',
  bottom: 0,
  right: '0.1rem',
  width: '2.4rem',
  height: '2.4rem',
  padding: '0.4rem',
  borderRadius: '1.2rem',
  cursor: 'pointer',
});

export const userInfo = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const titleWrapper = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});

export const titlePostfix = style({
  ...themeVars.fontStyles.body1_r_16,
});
