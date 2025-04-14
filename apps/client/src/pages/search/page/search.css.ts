import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const searchBarContainer = style({
  ...themeVars.display.flexJustifyAlignCenter,
  padding: '0.8rem 2rem',
  width: '100%',
  gap: '0.8rem',
  backgroundColor: themeVars.color.white,
});

export const searchBarFrame = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});

export const resultSection = style({
  ...themeVars.display.flexColumn,
});

export const countSection = style({
  padding: '1rem 2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: themeVars.border.gray200,
});

export const emptyPerformanceSection = style({
  ...themeVars.fontStyles.body3_m_14,
  height: '23rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  color: themeVars.color.gray500,
  textAlign: 'center',
});
