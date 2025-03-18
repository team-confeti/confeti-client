import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '4rem',
  textAlign: 'center',
});

export const logoText = style({
  marginBottom: '0.5rem',
  ...themeVars.fontStyles.subtitle1_m_18,
});
