import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  backgroundColor: themeVars.color.white,
  padding: '2.4rem',
  borderRadius: '1.4rem',
  border: `1px solid ${themeVars.color.gray200}`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  marginBottom: '2.4rem',

  ':last-child': {
    marginBottom: 0,
  },
});

export const header = style({
  marginBottom: '2.4rem',
});

export const title = style({
  fontSize: '1.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#101828',
  lineHeight: '2.6rem',
  letterSpacing: '-0.02em',
  paddingLeft: '1.2rem',
  borderLeft: `4px solid ${themeVars.color.slate900}`,
  marginBottom: '0.8rem',
});

export const description = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#6A7282',
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  marginTop: '0.8rem',
  paddingLeft: '1.6rem',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});
