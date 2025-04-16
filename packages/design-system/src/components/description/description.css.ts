import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const descriptionTextVariants = recipe({
  base: {
    whiteSpace: 'pre-line',
  },
  variants: {
    fontSize: {
      18: {
        ...themeVars.fontStyles.title3_b_18,
        color: themeVars.color.gray800,
      },
      20: {
        ...themeVars.fontStyles.title2_b_20,
        color: themeVars.color.black,
      },
    },
  },
});
