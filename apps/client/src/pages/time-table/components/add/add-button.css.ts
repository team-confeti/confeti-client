import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const addButtonVariants = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '3rem',
    border: themeVars.border.gray500_dashed,
    background: themeVars.color.white,
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '6rem',
        height: '6rem',
      },
      lg: {},
    },
  },
});
