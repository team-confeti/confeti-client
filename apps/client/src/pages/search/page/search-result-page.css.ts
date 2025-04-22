import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const resultSection = style({
  ...themeVars.display.flexColumn,
  paddingBottom: '9rem',
});
