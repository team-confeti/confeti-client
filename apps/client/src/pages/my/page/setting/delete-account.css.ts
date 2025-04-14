import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const selectSection = style({
  flex: '1',
});

export const textStyle = style({
  ...themeVars.display.flexAlignCenter,
  width: '100%',
  height: '6rem',
  padding: '1rem 2rem',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title3_b_18,
});

export const radioWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '3rem',
  padding: '1rem 2rem',
});

export const buttonWrapper = style({
  padding: '2rem',
});

export const label = style({
  display: 'flex',
  gap: '1rem',
  textAlign: 'center',
  ...themeVars.fontStyles.body2_r_15,
});

export const radioStyle = style({
  appearance: 'none',
  width: '2rem',
  height: '2rem',
  border: `1.5px solid ${themeVars.color.gray400}`,
  borderRadius: '10px',
  transition: 'all 0.3s ease',

  selectors: {
    '&:checked': {
      border: `5px solid ${themeVars.color.confeti_lime}`,
      borderRadius: '1rem',
    },

    '&:disabled': {
      border: '1px solid',
      color: themeVars.color.gray400,
    },
  },
});
