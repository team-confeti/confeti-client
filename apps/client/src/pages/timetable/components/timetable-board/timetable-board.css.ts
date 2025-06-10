import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  backgroundColor: themeVars.color.white,
  padding: '0 20px 20px 20px',
  maxWidth: '477px',
  width: '100%',
  overflowX: 'auto',
  position: 'relative',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  paddingTop: '12px',
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
        width: '437px',
        minWidth: '437px',
      },
    },
  },
});

export const stagesContainer = style({
  display: 'flex',
  width: 'calc(100% - 29px)',
  position: 'absolute',
  left: '29px',
  top: 0,
  bottom: 0,
  backgroundColor: themeVars.color.white,
});

export const timeList = style({
  ...themeVars.display.flexAlignCenter,
  marginBottom: '22px',
  backgroundColor: themeVars.color.white,
});

export const minutesP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 4px',
  marginRight: '7px',
  color: themeVars.color.gray400,
});

export const timeP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 4px',
  marginRight: '7px',
  color: themeVars.color.gray600,
});

export const timeBar = style({
  height: '1px',
  width: '100%',
  color: themeVars.color.gray300,
  zIndex: themeVars.zIndex.timeTable.row,
});

export const saveButton = style({
  borderRadius: '5px',
});

export const saveButtonWrapper = style({
  paddingTop: '32px',
});

export const stageColumn = style({
  flex: 1,
  minWidth: '102px',
  position: 'relative',
});

export const stagesWrapper = style({
  display: 'flex',
  width: '100%',
});
