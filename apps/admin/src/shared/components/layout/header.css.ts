import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  height: '6.4rem',
  backgroundColor: themeVars.color.white,
  borderBottom: `1px solid ${themeVars.color.gray200}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 2.4rem',
  flexShrink: 0,
});

export const leftSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const menuButton = style({
  width: '3.6rem',
  height: '3.6rem',
  padding: '0.8rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '1rem',
  color: themeVars.color.gray700,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray100,
  },
});

export const title = style({
  fontSize: '1.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#1E2939',
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const rightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const searchWrapper = style({
  position: 'relative',
  display: 'none',

  '@media': {
    '(min-width: 768px)': {
      display: 'block',
    },
  },
});

export const searchIcon = style({
  position: 'absolute',
  left: '1.2rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: 'rgba(15, 23, 43, 0.5)',
  pointerEvents: 'none',
  width: '1.8rem',
  height: '1.8rem',
});

export const searchInput = style({
  height: '3.6rem',
  paddingLeft: '4rem',
  paddingRight: '1.6rem',
  paddingTop: '0.8rem',
  paddingBottom: '0.8rem',
  backgroundColor: '#F3F4F6',
  border: 'none',
  borderRadius: '9999px',
  fontSize: '1.4rem',
  lineHeight: 'normal',
  letterSpacing: '-0.011em',
  color: themeVars.color.slate900,
  outline: 'none',
  width: '25.6rem',
  transition: 'all 0.2s ease',

  '::placeholder': {
    color: 'rgba(15, 23, 43, 0.5)',
  },

  ':focus': {
    outline: `2px solid ${themeVars.color.gray900}`,
    outlineOffset: '2px',
  },
});
