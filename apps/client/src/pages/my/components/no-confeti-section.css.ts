import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...themeVars.display.flexCenter,
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  padding: '6.4rem',
});
