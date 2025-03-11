import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white,
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
});
