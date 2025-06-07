import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const timeList = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '46px',
  zIndex: themeVars.zIndex.timeTable.row,
});

export const timeP = recipe({
  base: {
    ...themeVars.fontStyles.body5_r_12,
    padding: '0 4px',
    marginRight: '11px',
    backgroundColor: themeVars.color.white,
  },
  variants: {
    bold: {
      true: {
        color: themeVars.color.gray600,
      },
      false: {
        color: themeVars.color.gray400,
      },
    },
  },
  defaultVariants: {
    bold: false,
  },
});

export const timeBar = recipe({
  base: {
    height: '1px',
    width: 'calc(100% - 30px)',
    margin: '0',
    color: themeVars.color.gray300,
    zIndex: themeVars.zIndex.timeTable.row,
  },
  variants: {
    bold: {
      true: {},
      false: {
        display: 'none',
      },
    },
  },
  defaultVariants: {
    bold: false,
  },
});
