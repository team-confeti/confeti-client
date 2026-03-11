import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.8rem',
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
  color: '#101828',
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const countBadge = style({
  backgroundColor: '#F1F5F9',
  color: '#45556C',
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
  borderLeft: `4px solid #D1D5DC`,
  paddingLeft: '2rem',
  height: '2.8rem',
});

export const sectionTitlePast = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#6A7282',
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const countBadgePast = style({
  backgroundColor: '#F3F4F6',
  color: '#6A7282',
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
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2.4rem',
});

export const gridPast = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2.4rem',
  opacity: 0.75,
});

export const emptyState = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '3.3rem',
  color: '#99A1AF',
  backgroundColor: '#F9FAFB',
  borderRadius: '1.4rem',
  border: `1px solid ${themeVars.color.gray200}`,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.regular,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  height: '9rem',
});
