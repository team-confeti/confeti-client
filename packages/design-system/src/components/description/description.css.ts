import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const descriptionTextVariants = recipe({
  base: {
    width: '100%',
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

export const highlightedText = recipe({
  base: {
    width: '100%',
    whiteSpace: 'pre-line',
  },
  variants: {
    fontSize: {
      18: {
        ...themeVars.fontStyles.title3_b_18,
        color: themeVars.color.confeti_lime3,
      },
      20: {
        ...themeVars.fontStyles.title2_b_20,
        color: themeVars.color.confeti_lime3,
      },
    },
  },
});
