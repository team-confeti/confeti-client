import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexJustifyAlignCenter,
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  padding: '6.4rem',
});
