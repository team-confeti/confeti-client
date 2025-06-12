import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  width: '100%',
  height: '90svh',
  gap: '2.4rem',
});

export const iconDescriptionWrapper = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  gap: '2rem',
});

export const description = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  lineHeight: '150%',
});

export const button = style({
  width: '17.6rem',
  whiteSpace: 'nowrap',
});
