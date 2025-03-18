import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexJustifyAlignCenter,
  flexDirection: 'column',
  padding: '1.6rem 0',
  gap: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  whiteSpace: 'pre-line',
  lineHeight: '80%',
  fontWeight: '500',
});

export const button = style({
  width: '18rem',
});
