import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  width: '20rem',
  height: '100vh',
  backgroundColor: themeVars.color.gray800,
  padding: '2rem',
});

export const nav = style({
  ...themeVars.display.flexColumn,
  gap: '1rem',
});

export const link = style({
  fontSize: themeVars.fontSize.body1,
  color: themeVars.color.gray200,
  padding: '1rem',
  borderRadius: '8px',
  transition: 'background 0.2s, color 0.2s',

  selectors: {
    '&:hover': {
      backgroundColor: themeVars.color.gray700,
      color: themeVars.color.gray100,
    },
  },
});

export const active = style({
  backgroundColor: themeVars.color.gray700,
  color: themeVars.color.gray100,
});
