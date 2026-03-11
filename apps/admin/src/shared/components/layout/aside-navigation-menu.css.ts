import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  height: '100vh',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  transition: 'width 0.3s ease',
  boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.1)',
});

export const expanded = style({
  width: '25.6rem',
});

export const collapsed = style({
  width: '5rem',
});

export const header = style({
  height: '6.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid ${themeVars.color.slate700}`,
  flexShrink: 0,
});

export const logo = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  letterSpacing: '0.035em',
  lineHeight: '2.8rem',
});

export const logoCollapsed = style({
  fontSize: '1.25rem',
  fontWeight: themeVars.fontWeight.bold,
});

export const nav = style({
  flex: 1,
  paddingTop: '2.4rem',
  paddingLeft: '1.2rem',
  paddingRight: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  overflowY: 'auto',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const sectionTitle = style({
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '1.2rem',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  height: '4.8rem',
  padding: '0 1.2rem',
  color: themeVars.color.slate400,
  textDecoration: 'none',
  borderRadius: '1rem',
  transition: 'all 0.2s ease',
  position: 'relative',

  ':hover': {
    color: themeVars.color.white,
  },
});

export const active = style({
  backgroundColor: themeVars.color.blue550,
  color: themeVars.color.white,
  fontWeight: themeVars.fontWeight.medium,
  boxShadow:
    '0 4px 6px rgba(28, 57, 142, 0.2), 0 2px 4px rgba(28, 57, 142, 0.2)',

  ':hover': {
    backgroundColor: themeVars.color.blue550,
    color: themeVars.color.white,
  },
});

export const iconWrapper = style({
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const linkText = style({
  flex: 1,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const badge = style({
  backgroundColor: themeVars.color.red550,
  color: themeVars.color.white,
  fontSize: '1rem',
  fontWeight: themeVars.fontWeight.bold,
  height: '1.9rem',
  minWidth: '1.9rem',
  padding: '0 0.5rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: '1',
});

export const footer = style({
  padding: '1.7rem 1.6rem',
  borderTop: `1px solid ${themeVars.color.slate700}`,
  flexShrink: 0,
});

export const logoutButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
  height: '4rem',
  paddingLeft: '0.8rem',
  backgroundColor: 'transparent',
  border: 'none',
  color: themeVars.color.slate400,
  borderRadius: '1rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',

  ':hover': {
    color: themeVars.color.white,
  },
});
