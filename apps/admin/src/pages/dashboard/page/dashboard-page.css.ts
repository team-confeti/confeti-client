import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const tabWrapper = style({
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
  borderBottom: `1px solid ${themeVars.color.gray300}`,
});

export const tab = style({
  padding: '1rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: themeVars.fontSize.body1,
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.gray600,
  position: 'relative',
  transition: 'color 0.2s ease',

  ':hover': {
    color: themeVars.color.gray900,
  },
});

export const activeTab = style([
  tab,
  {
    color: '#4F46E5',
    fontWeight: themeVars.fontWeight.semibold,

    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#4F46E5',
    },
    ':hover': {
      color: '#4F46E5',
    },
  },
]);

export const dashboardPage = style({});
