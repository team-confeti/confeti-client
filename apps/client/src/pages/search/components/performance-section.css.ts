import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  padding: '1.6rem 0',
});

export const emptyPerformanceSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  ...themeVars.fontStyles.body3_m_14,
  height: '23rem',
  fontSize: '1.4rem',
  color: themeVars.color.gray500,
  textAlign: 'center',
});
