import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const title = style({
  padding: '1rem 0',
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
});

export const iconWrapper = style({
  display: 'flex',
  gap: '1.2rem',
  padding: '1rem 0',
});
