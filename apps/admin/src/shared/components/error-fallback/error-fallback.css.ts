import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  padding: '4rem 2rem',
  minHeight: '100%',
  textAlign: 'center',
});

export const icon = style({
  width: '4.8rem',
  height: '4.8rem',
  color: themeVars.color.red500,
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 600,
  color: adminVars.gray900tw,
  margin: 0,
});

export const message = style({
  fontSize: '1.4rem',
  color: adminVars.gray500tw,
  margin: 0,
  maxWidth: '40rem',
});

export const retryButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1rem 2rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.gray800,
    },
  },
});
