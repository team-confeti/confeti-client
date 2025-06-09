import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  backgroundColor: themeVars.color.white,
  padding: '0rem 2rem 2rem 2rem',
  maxWidth: '47.7rem',
  width: '100%',
  overflowX: 'auto',
  position: 'relative',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  paddingTop: '1.2rem',
  overflowY: 'visible',
  marginBottom: '9rem',
});

export const wrapper = recipe({
  base: {
    width: '100%',
    position: 'relative',
  },
  variants: {
    stageCount: {
      4: {
        width: '43.7rem',
        minWidth: '43.7rem',
      },
    },
  },
});

export const stagesContainer = style({
  display: 'flex',
  width: 'calc(100% - 2.9rem)',
  position: 'absolute',
  left: '2.9rem',
  top: 0,
  bottom: 0,
  backgroundColor: themeVars.color.white,
});

export const timeList = style({
  ...themeVars.display.flexAlignCenter,
  marginBottom: '2.2rem',
  backgroundColor: themeVars.color.white,
});

export const minutesP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 0.4rem',
  marginRight: '0.7rem',
  color: themeVars.color.gray400,
});

export const timeP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 0.4rem',
  marginRight: '0.7rem',
  color: themeVars.color.gray600,
});

export const timeBar = style({
  height: '0.1rem',
  width: '100%',
  color: themeVars.color.gray300,
  zIndex: themeVars.zIndex.timeTable.row,
});

export const saveButton = style({
  borderRadius: '5px',
});

export const saveButtonWrapper = style({
  paddingTop: '3.2rem',
});

export const stageColumn = style({
  flex: 1,
  minWidth: '10.2rem',
  position: 'relative',
});

export const stagesWrapper = style({
  display: 'flex',
  width: '100%',
});
