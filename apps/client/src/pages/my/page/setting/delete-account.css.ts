import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

export const selectSection = style({
  height: `calc( 100dvh - 32.5rem )`,
});

export const textStyle = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '6rem',
  padding: '1rem 2rem',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title3_b_18,
});

export const radioWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  padding: '1rem 2rem',
});

export const buttonWrapper = style({
  padding: '2rem',
});
