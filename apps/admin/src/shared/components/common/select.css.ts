import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const fullWidth = style({
  width: '100%',
});

export const label = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate800,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const select = style({
  height: '4.8rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.gray900tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  outline: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  width: '100%',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 3px rgba(29, 41, 61, 0.1)',
  },
});

export const error = style({
  borderColor: themeVars.color.red600,

  ':focus': {
    borderColor: themeVars.color.red600,
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
  },
});

export const errorText = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: themeVars.color.red600,
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});
