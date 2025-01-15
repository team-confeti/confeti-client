import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../../styles';

export const progressBarVariants = recipe({
  base: {
    ...themeVars.display.flexColumn,
    ...themeVars.fontStyles.caption_r_10,
    color: themeVars.color.white,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '3.2rem',
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
