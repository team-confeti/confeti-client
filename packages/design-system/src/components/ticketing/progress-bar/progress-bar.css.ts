import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../../styles';

export const progressBarVariants = recipe({
  base: {
    ...themeVars.fontStyles.caption_r_10,
    color: themeVars.color.white,
    padding: '0.4rem 0.6rem 0.4rem 0.8rem',
    borderRadius: '3.2rem',
    letterSpacing: '0.2rem',
    textAlign: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      md: {
        width: '4rem',
        background: themeVars.color.white_op_20,
        boxShadow: themeVars.shadowStyles.shadow_md_2.boxShadow,
      },
    },
  },
});
