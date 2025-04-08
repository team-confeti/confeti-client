import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const header = style({
  ...themeVars.display.flexAlignCenter,
  padding: '1.4rem 2rem 2rem 2rem',
  gap: '1.5rem',
  ...themeVars.fontStyles.body5_m_12,
});

export const sort = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});
