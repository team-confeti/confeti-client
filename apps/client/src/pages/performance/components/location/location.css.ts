import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2.4rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const title = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
  marginBottom: '1.2rem',
});

export const address = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
  whiteSpace: 'normal',
  wordBreak: 'break-word',
  display: 'inline',
});

export const copyButton = style({
  display: 'inline-flex',
  verticalAlign: 'middle',
});
