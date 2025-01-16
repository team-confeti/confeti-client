import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body3_r_14,
  borderBottom: themeVars.border.gray200,
  padding: '1rem 2rem',
  textAlign: 'center',
});
