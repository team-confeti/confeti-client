import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.9rem',
});

export const title = style({
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.gray500,
});
