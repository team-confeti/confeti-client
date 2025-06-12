import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 5.4rem)',
});

export const contentsSection = style({
  ...themeVars.display.flexColumn,
  flex: 1,
  padding: '1rem 2rem',
  gap: '2rem',
});

export const navigationLink = style({
  ...themeVars.display.flexBetweenAlignCenter,
  height: '3rem',
  cursor: 'pointer',
});

export const linkText = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
});
