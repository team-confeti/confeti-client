import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  fontWeight: 500,
  border: 'none',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const primary = style({
  backgroundColor: themeVars.color.blue500,
  color: themeVars.color.white,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: themeVars.color.blue600,
    },
  },
});

export const secondary = style({
  backgroundColor: adminVars.gray100tw,
  color: adminVars.gray900tw,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: adminVars.gray200tw,
    },
  },
});

export const danger = style({
  backgroundColor: themeVars.color.red500,
  color: themeVars.color.white,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: themeVars.color.red600,
    },
  },
});

export const ghost = style({
  backgroundColor: 'transparent',
  color: adminVars.gray500tw,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: adminVars.gray100tw,
    },
  },
});

export const small = style({
  padding: '0.6rem 1.2rem',
  fontSize: '1.3rem',
});

export const medium = style({
  padding: '0.8rem 1.6rem',
  fontSize: '1.4rem',
});

export const large = style({
  padding: '1.2rem 2rem',
  fontSize: '1.6rem',
});

export const iconLeft = style({
  display: 'flex',
  alignItems: 'center',
});

export const iconRight = style({
  display: 'flex',
  alignItems: 'center',
});
