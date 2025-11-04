import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2rem',
  minHeight: 'calc(100vh - 6rem)',
});

export const emptyMessage = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray600,
  textAlign: 'center',
  padding: '4rem 0',
});
