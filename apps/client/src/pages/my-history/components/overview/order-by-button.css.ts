import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const orderByButtonContainer = style({
  ...themeVars.display.flexAlignCenter,
  width: '7.8rem',
  padding: '0rem 0.4rem',
  gap: '0.2rem',
  cursor: 'pointer',
});

export const orderByText = style({
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.black,
  whiteSpace: 'nowrap',
});
