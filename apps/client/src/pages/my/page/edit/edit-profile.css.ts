import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const editProfileContainer = style({
  ...themeVars.display.flexColumn,
  // height: '100svh',
});

export const userInfo = style({
  width: '100%',
  height: '100%',
  maxHeight: '14rem',
});

export const editProfileContent = style({
  ...themeVars.display.flexBetween,
  flexDirection: 'column',
  padding: '2rem',
});

export const buttonWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  width: 'min(100%, var(--max-width))',
  transform: 'translateX(-50%)',
  padding: '2rem',
});
