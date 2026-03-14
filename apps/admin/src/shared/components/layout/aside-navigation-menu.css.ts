import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  height: '100vh',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  overflow: 'hidden',
  boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 8px 10px rgba(0, 0, 0, 0.1)',
});

export const header = style({
  height: '6.4rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  borderBottom: `1px solid ${themeVars.color.slate700}`,
  flexShrink: 0,
  overflow: 'hidden',
});

export const logoText = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  letterSpacing: '0.035em',
  lineHeight: '2.8rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const nav = style({
  flex: 1,
  paddingTop: '2rem',
  paddingLeft: '1.2rem',
  paddingRight: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
});

export const link = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    height: '4.4rem',
    padding: '0 1.4rem',
    color: themeVars.color.slate400,
    textDecoration: 'none',
    borderRadius: '0.8rem',
    transition:
      'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    whiteSpace: 'nowrap',

    ':hover': {
      color: themeVars.color.white,
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
    },
  },
  variants: {
    active: {
      true: {
        backgroundColor: themeVars.color.blue550,
        color: themeVars.color.white,
        fontWeight: themeVars.fontWeight.medium,
        boxShadow:
          '0 4px 6px rgba(28, 57, 142, 0.2), 0 2px 4px rgba(28, 57, 142, 0.2)',

        ':hover': {
          backgroundColor: themeVars.color.blue550,
          color: themeVars.color.white,
        },
      },
    },
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
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.2rem',
  letterSpacing: '-0.01em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
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
  flexShrink: 0,
});

export const footer = style({
  padding: '1.7rem 1.2rem',
  borderTop: `1px solid ${themeVars.color.slate700}`,
  flexShrink: 0,
  overflow: 'hidden',
});

export const logoutButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
  height: '4rem',
  padding: '0 1.4rem',
  backgroundColor: 'transparent',
  border: 'none',
  color: themeVars.color.slate400,
  borderRadius: '1rem',
  cursor: 'pointer',
  transition: 'color 0.2s ease',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  whiteSpace: 'nowrap',
  overflow: 'hidden',

  ':hover': {
    color: themeVars.color.white,
  },
});
