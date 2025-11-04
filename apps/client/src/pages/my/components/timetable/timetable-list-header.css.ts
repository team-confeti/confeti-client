import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  padding: '2.4rem 2rem 1.4rem 2rem',
  gap: '1.5rem',
  ...themeVars.fontStyles.body3_m_14,
});

export const sort = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});

export const leftContent = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.5rem',
});

export const rightContent = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});
