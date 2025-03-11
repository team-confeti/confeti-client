import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...themeVars.fontStyles.body3_m_14,
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'absolute',
  top: '0.7rem',
  right: '0',
  height: '4.5rem',
  width: 'calc(100% - 3.1rem)',
  color: themeVars.color.gray600,
  background: themeVars.color.gray200,
});
