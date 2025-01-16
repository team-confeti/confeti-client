import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const containerVariants = recipe({
  base: {
    ...themeVars.display.flexColumnStart,
    background: themeVars.color.white,
  },
  variants: {
    size: {
      sm: {},
      md: {
        padding: '2.4rem 2rem',
      },
      lg: {},
    },
  },
});

export const ImagesVariants = recipe({
  base: {
    ...themeVars.display.flexCenter,
    background: themeVars.color.white,
    border: themeVars.border.gray400,
    flexShrink: '0',
    borderRadius: '3rem',
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '6rem',
        height: '6rem',
      },
    },
  },
});
