import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  gap: '2.4rem',
  transform: 'translate(-50%, -50%)',
});

export const iconDescriptionWrapper = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  gap: '2rem',
});

export const icon = style({
  width: '5rem',
  height: '5rem',
});

export const description = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  lineHeight: '150%',
});

export const button = style({
  width: '17.6rem',
});
