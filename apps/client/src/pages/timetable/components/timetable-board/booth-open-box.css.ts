import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import {
  HALF_HOUR_HEIGHT_PX,
  TIME_LABEL_WIDTH_PX,
} from '@pages/timetable/constants';

export const wrapper = style({
  ...themeVars.fontStyles.body3_m_14,
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'absolute',
  top: 0,
  left: `${TIME_LABEL_WIDTH_PX}px`,
  height: `${HALF_HOUR_HEIGHT_PX}px`,
  width: `calc(100% - ${TIME_LABEL_WIDTH_PX}px)`,
  color: themeVars.color.gray600,
  background: themeVars.color.gray200,
  zIndex: themeVars.zIndex.timeTable.content,
});
