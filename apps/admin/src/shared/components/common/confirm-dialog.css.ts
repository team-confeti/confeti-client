import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const overlay = style({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9998,
  backdropFilter: 'blur(2px)',
});

export const dialog = style({
  width: '44rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '1.6rem',
  padding: '2.4rem',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  marginBottom: '1.6rem',
});

export const iconLow = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '1rem',
  backgroundColor: adminVars.amber100,
  color: adminVars.amber700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const iconMedium = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '1rem',
  backgroundColor: adminVars.amber100,
  color: adminVars.amber700,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const iconHigh = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '1rem',
  backgroundColor: adminVars.red100,
  color: themeVars.color.red600,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

export const title = style({
  flex: 1,
  fontSize: '1.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  margin: 0,
});

export const closeButton = style({
  width: '3.2rem',
  height: '3.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  color: adminVars.gray400tw,
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: adminVars.gray100tw,
    color: themeVars.color.slate900,
  },
});

export const message = style({
  fontSize: '1.5rem',
  color: adminVars.slate600tw,
  lineHeight: '2.2rem',
  margin: '0 0 2.4rem',
});

export const actions = style({
  display: 'flex',
  gap: '1.2rem',
  justifyContent: 'flex-end',
});

export const cancelButton = style({
  height: '4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.white,
  color: adminVars.slate600tw,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: adminVars.gray50tw,
  },
});

export const confirmButton = style({
  height: '4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

export const confirmButtonDanger = style({
  height: '4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.red600,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: adminVars.red700,
  },
});
