import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  minHeight: 'calc(100dvh - 98px)',
  width: '100%',
});

export const image = style({
  width: '52.27%',
  aspectRatio: '1 / 1',
});

export const title = style({
  ...themeVars.fontStyles.subtitle3_b_15,
  color: themeVars.color.gray500,
  marginBottom: '1rem',
});

export const description = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray400,
  lineHeight: '20px',
});
