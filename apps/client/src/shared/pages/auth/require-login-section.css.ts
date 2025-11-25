import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  width: '100%',
  height: 'calc(100dvh - 98px)',
  gap: '2rem',
});

export const content = style({
  display: 'grid',
  gap: '0.8rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const description = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
});

export const button = style({
  width: '17.6rem',
});
