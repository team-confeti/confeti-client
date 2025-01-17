import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../../styles';
export const infoButtonVariants = recipe({
  base: {
    ...themeVars.fontStyles.subtitle5_sb_12,
    color: themeVars.color.white,
    display: 'flex',
    alignItems: 'center',
    padding: '0.8rem',
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '11.7rem',
        height: '3rem',
      },
      lg: {},
    },
  },
});
