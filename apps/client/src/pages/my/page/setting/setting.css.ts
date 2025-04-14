import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const contentsSection = style({
  ...themeVars.display.flexColumn,
  padding: '1rem 2rem',
  gap: '2rem',
});
