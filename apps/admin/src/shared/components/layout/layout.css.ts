import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  height: '100vh',
  backgroundColor: themeVars.color.gray100,
  overflow: 'hidden',
});

export const mainContainer = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden',
});

export const content = style({
  flex: 1,
  padding: '2.4rem',
  overflowY: 'auto',
});
