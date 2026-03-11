import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '2rem',
  backgroundColor: themeVars.color.gray100,
});

export const icon = style({
  width: '6.4rem',
  height: '6.4rem',
  color: themeVars.color.slate600,
});

export const title = style({
  fontSize: '2.4rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray900,
  margin: 0,
});

export const message = style({
  fontSize: '1.6rem',
  color: themeVars.color.gray600,
  margin: 0,
  textAlign: 'center',
});

export const loginButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1.2rem 3.2rem',
  backgroundColor: themeVars.color.blue550,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',

  ':hover': {
    opacity: 0.9,
  },
});
