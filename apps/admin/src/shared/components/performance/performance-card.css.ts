import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const card = style({
  backgroundColor: themeVars.color.white,
  borderRadius: '1.6rem',
  border: `1px solid ${themeVars.color.gray200}`,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  flexDirection: 'column',

  ':hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    borderColor: themeVars.color.gray300,
    transform: 'translateY(-2px)',
  },
});

export const pastCard = style({
  ':hover': {
    borderColor: themeVars.color.gray200,
  },
});

export const imageContainer = style({
  position: 'relative',
  height: '16rem',
  backgroundColor: themeVars.color.gray200,
  overflow: 'hidden',
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.5s ease',

  selectors: {
    [`${card}:hover &`]: {
      transform: 'scale(1.05)',
    },
  },
});

export const imagePlaceholder = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: themeVars.color.gray400,
  backgroundColor: themeVars.color.gray100,
  opacity: 0.2,
});

export const typeBadge = style({
  position: 'absolute',
  top: '1.2rem',
  left: '1.2rem',
  padding: '0.4rem 0.8rem',
  borderRadius: '0.8rem',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.white,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  lineHeight: '1.6rem',
});

export const typeBadgeFestival = style({
  backgroundColor: themeVars.color.purple400,
});

export const typeBadgeConcert = style({
  backgroundColor: themeVars.color.emerald400,
});

export const pastOverlay = style({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(16, 24, 40, 0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const pastLabel = style({
  padding: '0.5rem 1.2rem',
  backgroundColor: 'rgba(16, 24, 40, 0.8)',
  color: themeVars.color.white,
  borderRadius: '9999px',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.bold,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  lineHeight: '2rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
});

export const content = style({
  padding: '1.6rem 2rem',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const title = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  marginBottom: '0.2rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const subtitle = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
  marginBottom: '1.2rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const infoSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginTop: 'auto',
});

export const infoItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

export const footer = style({
  padding: '1.2rem 2rem',
  borderTop: `1px solid ${adminVars.gray100tw}`,
  backgroundColor: adminVars.gray50tw,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '4.4rem',
});

export const statusBadge = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.medium,
  padding: '0.5rem 0.8rem',
  borderRadius: '0.4rem',
  color: themeVars.color.blue550,
  backgroundColor: adminVars.blue50,
  lineHeight: '1.6rem',
  height: '2.4rem',
  display: 'flex',
  alignItems: 'center',
});

export const pastStatus = style({
  color: adminVars.slate600tw,
  backgroundColor: adminVars.gray200tw,
});

export const chevron = style({
  color: themeVars.color.gray400,
  transition: 'all 0.2s ease',

  selectors: {
    [`${card}:hover &`]: {
      color: themeVars.color.gray900,
      transform: 'translateX(0.25rem)',
    },
  },
});
