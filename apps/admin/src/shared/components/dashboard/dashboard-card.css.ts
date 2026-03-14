import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const card = style({
  backgroundColor: themeVars.color.white,
  padding: '2.8rem',
  borderRadius: '2rem',
  border: `1px solid ${themeVars.color.gray200}`,
  cursor: 'pointer',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '18rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',

  ':hover': {
    borderColor: themeVars.color.gray300,
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-2px)',
  },
});

const iconWrapperBase = style({
  width: '4.4rem',
  height: '4.4rem',
  borderRadius: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 0.25s ease',

  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.08)',
    },
  },
});

export const iconWrapper = styleVariants({
  pending: [iconWrapperBase, { backgroundColor: '#FEF3C7', color: '#B45309' }],
  festival: [iconWrapperBase, { backgroundColor: '#EDE9FE', color: '#7C3AED' }],
  concert: [iconWrapperBase, { backgroundColor: '#D1FAE5', color: '#047857' }],
});

export const bottom = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
});

export const title = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '1.8rem',
  letterSpacing: '0.01em',
});

export const count = style({
  fontSize: '3.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  lineHeight: '4rem',
  letterSpacing: '-0.03em',
});
