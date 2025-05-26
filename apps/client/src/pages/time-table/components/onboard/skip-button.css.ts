import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const skipButton = style({
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.confeti_lime3,
  width: '2.8rem',
  height: '1.6rem',
  cursor: 'pointer',
  textDecoration: 'underline',
});
