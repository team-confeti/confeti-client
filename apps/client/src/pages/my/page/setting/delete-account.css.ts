import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const textStyle = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '6rem',
  padding: '1rem 2rem',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title3_b_18,
});
