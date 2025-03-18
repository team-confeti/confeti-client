import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '17% 6% 15% 6%',
});

export const bottomSection = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  alignItems: 'center',
  gap: '2.8rem',
  marginTop: '20vh',
});

export const loginButton = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  alignItems: 'flex-start',
  gap: '1.2rem',
});

export const description = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray400,
  textAlign: 'center',
  whiteSpace: 'pre-line',
});

export const atagText = style({
  textDecoration: 'underline',
});
