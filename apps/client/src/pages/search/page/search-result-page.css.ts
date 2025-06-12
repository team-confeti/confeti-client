import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 10.8rem)',
});

export const resultSection = style({
  flex: 1,
  ...themeVars.display.flexColumn,
  paddingBottom: '9rem',
});
