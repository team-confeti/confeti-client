import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  position: 'absolute',
  top: '48%',
  left: '50%',
  width: '100%',
  transform: 'translate(-50%, -50%)',
  color: themeVars.color.gray600,
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray800,
  margin: '3rem 0 0.6rem 0',
});

export const subtitle = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
});
