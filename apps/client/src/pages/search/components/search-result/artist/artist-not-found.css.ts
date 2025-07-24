import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const pageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: 'calc(100vh - 10.8rem)',
});

export const container = style({
  flex: 1,
  ...themeVars.display.flexColumnAlignTextCenter,
  color: themeVars.color.gray600,
  padding: '13rem 0 13rem 0',
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
