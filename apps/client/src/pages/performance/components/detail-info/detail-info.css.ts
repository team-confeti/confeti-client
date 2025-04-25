import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2.2rem 2rem',
  backgroundColor: themeVars.color.white,
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const detail = style({
  display: 'flex',
  gap: '0.8rem',
});

export const label = style({
  color: themeVars.color.gray500,
  ...themeVars.fontStyles.subtitle4_b_14,
});

export const text = style({
  color: themeVars.color.black,
  ...themeVars.fontStyles.body3_r_14,
});

export const priceContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const priceDetail = style({
  color: themeVars.color.black,
  ...themeVars.fontStyles.body3_r_14,
});
