import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexJustifyAlignCenter,
  flexDirection: 'column',
  flex: 1,
  gap: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title5_b_15,
  color: themeVars.color.gray400,
});

export const description = style({
  marginTop: '0.4rem',
  ...themeVars.fontStyles.body4_m_13_2,
  color: themeVars.color.gray400,
  textAlign: 'center',
});

export const button = style({
  position: 'sticky',
  bottom: '0',
  padding: '2rem',
  height: '9rem',
  width: '100%',

  backgroundColor: themeVars.color.white,
});
