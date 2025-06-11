import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.fontStyles.body3_m_14,
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'absolute',
  top: '0',
  right: '0',
  height: '45px',
  width: 'calc(100% - 29px)',
  color: themeVars.color.gray600,
  background: themeVars.color.gray200,
  zIndex: themeVars.zIndex.timeTable.row,
  marginTop: '7px',
});
