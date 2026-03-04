import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  display: 'flex',
  padding: '1.6rem 0 0 0',
  flexDirection: 'column',
  alignItems: 'stretch',
});

export const sectionTitle = style({
  display: 'flex',
  padding: '0 2rem',
  alignItems: 'center',
  ...themeVars.fontStyles.title4_b_16,
});

export const emptyPerformanceSection = style({
  height: '100%',
  minHeight: '14rem',
  ...themeVars.display.flexJustifyAlignCenter,
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.gray500,
  textAlign: 'center',
});
