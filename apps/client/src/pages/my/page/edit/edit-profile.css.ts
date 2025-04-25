import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const editProfileContainer = style({
  ...themeVars.display.flexColumn,
  height: '100svh',
});

export const userInfo = style({
  width: '100%',
  height: '100%',
  maxHeight: '14rem',
});

export const editProfileContent = style({
  ...themeVars.display.flexBetween,
  flexDirection: 'column',
  height: '100svh',
  padding: '2rem',
});
