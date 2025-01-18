import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  gap: '2rem',
  backgroundColor: themeVars.color.white,
  maxHeight: '50.8rem',
  overflow: 'hidden',
  transition: 'max-height 0.3s ease',
});

export const expanded = style({
  maxHeight: 'none',
  overflow: 'visible',
});

export const collapsed = style({
  maxHeight: '50rem',
  overflow: 'hidden',
});

export const wrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2rem',
  padding: '2rem 2rem 0 2rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
});
