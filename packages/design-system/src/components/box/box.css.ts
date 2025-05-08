import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const boxVariants = recipe({
  base: {
    padding: '2rem',
  },
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.6rem',
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const titleVariants = recipe({
  base: {
    color: themeVars.color.black,
  },
  variants: {
    titleSize: {
      md: {
        ...themeVars.fontStyles.title4_b_16,
      },
      lg: {
        ...themeVars.fontStyles.title3_b_18,
      },
    },
  },
});

export const subtitle = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.4rem',
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.confeti_lime3,
});

export const buttonWrapper = style({
  ...themeVars.display.flexAlignCenter,
});

export const button = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.gray500,
});
