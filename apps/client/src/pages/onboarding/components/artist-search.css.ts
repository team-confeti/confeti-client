import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const searchBarContainer = style({
  ...themeVars.display.flexJustifyAlignCenter,
  padding: '0.8rem 2rem',
  width: '100%',
  gap: '0.8rem',
  backgroundColor: themeVars.color.white,
});

export const searchBarFrame = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});

export const artistSearchContainer = style({
  ...themeVars.display.flexAlignCenter,
  justifyContent: 'center',
  width: '100%',
  height: '100dvh',
});

export const artistSearchDescription = style({
  ...themeVars.fontStyles.body2_m_15,
  color: themeVars.color.gray500,
});
