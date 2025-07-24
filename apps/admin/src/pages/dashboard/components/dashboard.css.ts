import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const tableWrapper = style({
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '8px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflow: 'hidden',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const tableHead = style({
  backgroundColor: themeVars.color.gray200,
  position: 'relative',
});

export const tableHeader = style({
  padding: '1.25rem 2rem',
  textAlign: 'left',
  fontSize: themeVars.fontSize.body3,
  fontWeight: themeVars.fontWeight.semibold,
  color: themeVars.color.gray800,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  position: 'relative',

  selectors: {
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1px',
      height: '70%',
      backgroundColor: themeVars.color.gray300,
    },
  },
});

export const tableRow = style({
  transition: 'all 0.15s ease-in-out',
  cursor: 'pointer',

  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${themeVars.color.gray100}`,
    },
    '&:hover': {
      backgroundColor: themeVars.color.gray100,
      transform: 'translateY(-1.25px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    },
  },
});

export const tableCell = style({
  padding: '1.5rem 2rem',
  position: 'relative',
  whiteSpace: 'nowrap',
  color: themeVars.color.gray800,
  fontSize: themeVars.fontSize.body4,

  selectors: {
    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '1px',
      height: '60%',
      backgroundColor: themeVars.color.gray200,
    },
  },
});
