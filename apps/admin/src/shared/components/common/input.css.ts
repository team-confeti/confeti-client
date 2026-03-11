import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

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
  color: '#344054',
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const inputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const leftIcon = style({
  position: 'absolute',
  left: '1.2rem',
  color: '#6A7282',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
});

export const input = style({
  height: '4.8rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#101828',
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  outline: 'none',
  transition: 'all 0.2s ease',
  width: '100%',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 3px rgba(29, 41, 61, 0.1)',
  },

  '::placeholder': {
    color: '#98A2B3',
  },
});

export const withIcon = style({
  paddingLeft: '3.6rem',
});

export const error = style({
  borderColor: '#DC2626',

  ':focus': {
    borderColor: '#DC2626',
    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)',
  },
});

export const errorText = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#DC2626',
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});
