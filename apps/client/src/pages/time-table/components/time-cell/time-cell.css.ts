import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';
import { recipe } from '@vanilla-extract/recipes';

export const timeList = style({
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '3rem',
});

export const timeP = recipe({
  base: {
    ...themeVars.fontStyles.body5_r_12,
    padding: '0 0.4rem',
    marginRight: '0.7rem',
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
    height: '0.1rem',
    width: 'calc(100% - 3rem)',

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
