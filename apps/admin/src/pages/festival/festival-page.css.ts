import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.8rem',
});

export const pageHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: '-2.4rem',
});

export const pageTitle = style({
  fontSize: '2.4rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  margin: 0,
  lineHeight: '3.2rem',
  letterSpacing: '-0.025em',
});

export const pageSubtitle = style({
  fontSize: '1.4rem',
  color: adminVars.slate600tw,
  margin: '0.4rem 0 0',
});

export const addButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '3.6rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  borderLeft: `4px solid ${themeVars.color.slate900}`,
  paddingLeft: '2rem',
  height: '2.8rem',
});

export const sectionTitle = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const countBadge = style({
  backgroundColor: adminVars.slate50,
  color: adminVars.slate600tw,
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.6rem',
  height: '2rem',
  padding: '0 0.8rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const sectionHeaderPast = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  borderLeft: `4px solid ${themeVars.color.gray300}`,
  paddingLeft: '2rem',
  height: '2.8rem',
});

export const sectionTitlePast = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate600tw,
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const countBadgePast = style({
  backgroundColor: adminVars.gray100tw,
  color: adminVars.slate600tw,
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.6rem',
  height: '2rem',
  padding: '0 0.8rem',
  borderRadius: '9999px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))',
  gap: '2rem',
});

export const gridPast = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(24rem, 1fr))',
  gap: '2rem',
  opacity: 0.75,
});

export const emptyState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3rem',
  color: themeVars.color.gray400,
  backgroundColor: themeVars.color.white,
  borderRadius: '0.75rem',
  border: `1px solid ${themeVars.color.gray200}`,
});
