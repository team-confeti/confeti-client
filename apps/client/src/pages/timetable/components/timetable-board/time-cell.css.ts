import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

import {
  HALF_HOUR_HEIGHT_PX,
  TIME_LABEL_WIDTH_PX,
} from '@pages/timetable/constants';

export const hourCell = style({
  position: 'relative',
  height: `${HALF_HOUR_HEIGHT_PX * 2}px`,
  width: '100%',
});

export const timeLabel = recipe({
  base: {
    ...themeVars.fontStyles.subtitle5_sb_12,
    position: 'absolute',
    left: 0,
    width: `${TIME_LABEL_WIDTH_PX}px`,
    textAlign: 'center',
    backgroundColor: themeVars.color.white,
    zIndex: themeVars.zIndex.timeTable.row + 1,
    transform: 'translateY(-50%)',
  },
  variants: {
    type: {
      hour: {
        top: 0,
        color: themeVars.color.gray600,
      },
      half: {
        top: `${HALF_HOUR_HEIGHT_PX}px`,
        color: themeVars.color.gray400,
      },
    },
  },
  defaultVariants: {
    type: 'hour',
  },
});

export const timeLine = recipe({
  base: {
    position: 'absolute',
    left: `${TIME_LABEL_WIDTH_PX}px`,
    right: 0,
    height: '1px',
    backgroundColor: themeVars.color.gray300,
    border: 'none',
    margin: 0,
    zIndex: 0,
  },
  variants: {
    type: {
      hour: {
        top: 0,
      },
      half: {
        top: `${HALF_HOUR_HEIGHT_PX}px`,
        display: 'none',
      },
    },
  },
  defaultVariants: {
    type: 'hour',
  },
});
