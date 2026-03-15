import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '15vh',
  zIndex: 9999,
  backdropFilter: 'blur(4px)',
});

export const palette = style({
  width: '56rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '1.6rem',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
});

export const searchRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.6rem 2rem',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
});

export const searchIcon = style({
  color: adminVars.gray400tw,
  flexShrink: 0,
});

export const searchInput = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '1.6rem',
  color: themeVars.color.slate900,
  backgroundColor: 'transparent',

  '::placeholder': {
    color: adminVars.gray400tw,
  },
});

export const escKey = style({
  padding: '0.2rem 0.6rem',
  backgroundColor: adminVars.gray100tw,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '0.4rem',
  fontSize: '1.1rem',
  color: adminVars.gray500tw,
  fontFamily: 'monospace',
  flexShrink: 0,
});

export const results = style({
  padding: '0.8rem',
  maxHeight: '40rem',
  overflowY: 'auto',
});

export const resultItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
  padding: '1rem 1.2rem',
  borderRadius: '0.8rem',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background-color 0.1s ease',

  ':hover': {
    backgroundColor: adminVars.gray50tw,
  },
});

export const resultItemActive = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
  padding: '1rem 1.2rem',
  borderRadius: '0.8rem',
  border: 'none',
  backgroundColor: adminVars.gray100tw,
  cursor: 'pointer',
  textAlign: 'left' as const,
});

export const resultIcon = style({
  color: adminVars.gray500tw,
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
});

export const resultLabel = style({
  flex: 1,
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.slate900,
});

export const resultGroup = style({
  fontSize: '1.2rem',
  color: adminVars.gray400tw,
});

export const empty = style({
  padding: '3.2rem',
  textAlign: 'center',
  color: adminVars.gray400tw,
  fontSize: '1.4rem',
});

export const footer = style({
  display: 'flex',
  gap: '1.6rem',
  padding: '1.2rem 2rem',
  borderTop: `1px solid ${themeVars.color.gray100}`,
  backgroundColor: adminVars.gray50tw,
});

export const footerHint = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '1.2rem',
  color: adminVars.gray400tw,
});

export const kbd = style({
  padding: '0.1rem 0.5rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '0.4rem',
  fontSize: '1.1rem',
  fontFamily: 'monospace',
  color: adminVars.gray500tw,
});
