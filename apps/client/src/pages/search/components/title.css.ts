import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const title = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray600,
  marginBottom: '0.4rem',
  textAlign: 'left',
  padding: '0 2rem',
});
