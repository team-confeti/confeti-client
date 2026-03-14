import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',
});

export const pageHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const pageTitle = style({
  fontSize: '2.4rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  lineHeight: '3.2rem',
  letterSpacing: '-0.025em',
  margin: 0,
});

export const pageSubtitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  margin: 0,
});

export const cardGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
});

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const sectionTitle = style({
  fontSize: '1.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  margin: 0,
});

export const sectionBadge = style({
  backgroundColor: adminVars.red100,
  color: themeVars.color.red600,
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  padding: '0.2rem 0.8rem',
  borderRadius: '9999px',
  lineHeight: '1.8rem',
});

export const attentionList = style({
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.4rem',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
});

export const attentionItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  padding: '1.6rem 2rem',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: adminVars.gray50tw,
  },

  ':last-child': {
    borderBottom: 'none',
  },
});

export const attentionItemIcon = style({
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '0.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: themeVars.color.white,
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  flexShrink: 0,
});

export const attentionItemInfo = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.2rem',
  minWidth: 0,
});

export const attentionItemTitle = style({
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.slate900,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const attentionItemMeta = style({
  fontSize: '1.3rem',
  color: adminVars.slate600tw,
});

export const attentionItemChevron = style({
  color: adminVars.gray400tw,
  flexShrink: 0,
  transition: 'transform 0.15s ease',

  selectors: {
    [`${attentionItem}:hover &`]: {
      transform: 'translateX(2px)',
      color: themeVars.color.slate900,
    },
  },
});

export const viewAllButton = style({
  alignSelf: 'flex-start',
  padding: '0.8rem 1.6rem',
  backgroundColor: 'transparent',
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  cursor: 'pointer',
  transition: 'all 0.15s ease',

  ':hover': {
    backgroundColor: adminVars.gray50tw,
    borderColor: themeVars.color.gray300,
  },
});

export const quickActions = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1.2rem',
});

export const quickActionButton = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  padding: '2.4rem 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.4rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.slate900,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',

  ':hover': {
    borderColor: themeVars.color.slate900,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-1px)',
  },
});
