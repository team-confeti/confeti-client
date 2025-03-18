import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../../styles';
export const infoButtonVariants = recipe({
  base: {
    ...themeVars.fontStyles.subtitle5_sb_12,
    color: themeVars.color.white,
    display: 'flex',
    alignItems: 'center',
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '11.7rem',
        height: '3rem',
      },
      lg: {
        ...themeVars.fontStyles.subtitle2_sb_16,
      },
    },
  },
});
