import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const card = style({
  backgroundColor: themeVars.color.white,
  padding: '2.5rem',
  borderRadius: '1.4rem',
  border: `1px solid ${themeVars.color.gray200}`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  height: '17.4rem',
  display: 'flex',
  flexDirection: 'column',

  ':hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
});

const iconWrapperBase = style({
  width: '4.8rem',
  height: '4.8rem',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: themeVars.color.white,
  marginBottom: '1.6rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease',

  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const iconWrapper = styleVariants({
  pending: [iconWrapperBase, { backgroundColor: themeVars.color.yellow400 }],
  festival: [iconWrapperBase, { backgroundColor: themeVars.color.purple400 }],
  concert: [iconWrapperBase, { backgroundColor: themeVars.color.emerald400 }],
});

export const title = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  marginBottom: '0.4rem',
});

export const count = style({
  fontSize: '3rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '3.6rem',
  letterSpacing: '0.013em',
});
