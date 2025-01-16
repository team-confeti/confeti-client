import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  gap: '2rem',
  backgroundColor: themeVars.color.white,
});

export const wrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2rem',
  padding: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
});
