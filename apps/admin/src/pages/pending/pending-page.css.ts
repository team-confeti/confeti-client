import { style, styleVariants } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.4rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  height: '60rem',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '9.7rem',
  padding: '0 2.4rem',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
  flexShrink: 0,
});

export const title = style({
  fontSize: '1.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
  marginBottom: 0,
});

export const subtitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  marginTop: '0.4rem',
});

export const createButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '3.6rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  borderRadius: '1rem',
  border: 'none',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow:
    '0 10px 15px rgba(15, 23, 43, 0.2), 0 4px 6px rgba(15, 23, 43, 0.2)',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

export const emptyState = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem',
  color: themeVars.color.gray400,
});

export const emptyIcon = style({
  marginBottom: '1rem',
  opacity: 0.2,
});

export const content = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

export const filterSection = style({
  display: 'flex',
  alignItems: 'center',
  padding: '1.6rem 2.4rem',
  borderBottom: `1px solid ${adminVars.gray100tw}`,
  flexShrink: 0,
});

export const filterList = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  flexWrap: 'wrap',
});

export const filterButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '3.2rem',
  padding: '0 1.2rem',
  borderRadius: '9999px',
  border: `1px solid ${themeVars.color.gray200}`,
  backgroundColor: themeVars.color.white,
  color: adminVars.slate600tw,
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '1.8rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: themeVars.color.gray300,
    color: adminVars.gray900tw,
  },
});

export const filterButtonActive = styleVariants({
  ALL: [
    filterButton,
    {
      borderColor: themeVars.color.slate900,
      backgroundColor: themeVars.color.slate900,
      color: themeVars.color.white,
    },
  ],
  FESTIVAL: [
    filterButton,
    {
      borderColor: '#D8B4FE',
      backgroundColor: '#F3E8FF',
      color: '#7C3AED',
    },
  ],
  CONCERT: [
    filterButton,
    {
      borderColor: '#A7F3D0',
      backgroundColor: '#D1FAE5',
      color: '#047857',
    },
  ],
});

export const listContainer = style({
  flex: 1,
  overflowY: 'auto',
});

export const listItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '9.7rem',
  padding: '0 2.4rem',
  borderBottom: `1px solid ${adminVars.gray100tw}`,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':last-child': {
    borderBottom: 'none',
  },

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const itemContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
});

export const itemIcon = style({
  width: '4.8rem',
  height: '4.8rem',
  borderRadius: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: themeVars.color.purple400,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
});

export const typeIcon = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.white,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const itemInfo = style({
  flex: 1,
  minWidth: 0,
});

export const itemTitleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  minWidth: 0,
});

export const itemTitle = style({
  flex: 1,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  margin: 0,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  transition: 'color 0.2s ease',

  selectors: {
    [`${listItem}:hover &`]: {
      color: themeVars.color.blue600,
    },
  },
});

export const typeBadge = style({
  display: 'inline-flex',
  alignItems: 'center',
  height: '2.4rem',
  padding: '0 0.8rem',
  borderRadius: '9999px',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.6rem',
  flexShrink: 0,
});

export const typeBadgeFestival = style({
  backgroundColor: '#F3E8FF',
  color: '#7C3AED',
});

export const typeBadgeConcert = style({
  backgroundColor: '#D1FAE5',
  color: '#047857',
});

export const itemMeta = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  marginTop: '0.4rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const dot = style({
  width: '0.4rem',
  height: '0.4rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.gray300,
  flexShrink: 0,
});

export const itemActions = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
});

export const badge = style({
  height: '2.4rem',
  padding: '0 1.2rem',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: adminVars.yellow100,
  color: adminVars.amber700,
  borderRadius: '9999px',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.6rem',
});

export const moreButton = style({
  width: '3.4rem',
  height: '3.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '9999px',
  cursor: 'pointer',
  color: adminVars.slate600tw,
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: adminVars.gray100tw,
  },
});
