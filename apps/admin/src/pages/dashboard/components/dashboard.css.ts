import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const tableContainer = style({
  overflowX: 'auto',
  margin: '20px 0',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
});

export const tableHead = style({
  backgroundColor: themeVars.color.gray100,
});

export const tableHeader = style({
  padding: '1rem 2rem',
  textAlign: 'left',
  fontSize: themeVars.fontSize.body2,
  fontWeight: themeVars.fontWeight.semibold,
  textTransform: 'uppercase',
  color: themeVars.color.gray600,
  letterSpacing: '0.05em',
});

export const tableCell = style({
  padding: '1rem 2rem',
  fontSize: themeVars.fontSize.body4,
  color: themeVars.color.gray900,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
});

export const tableRow = style({
  borderTop: `1px solid ${themeVars.color.gray300}`,
  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.gray100,
    },
  },
});
