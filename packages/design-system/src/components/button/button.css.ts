import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const buttonVariants = recipe({
  base: {
    width: '100%',
    ...themeVars.display.flexJustifyAlignCenter,
    gap: '0.8rem',
    borderRadius: '1rem',
    backgroundColor: themeVars.color.confeti_lime,
    color: themeVars.color.gray800,
  },
  variants: {
    variant: {
      default: {
        ...themeVars.fontStyles.subtitle4_b_14,
        height: '3.9rem',
        padding: '1rem 3rem',
      },
      link: {
        ...themeVars.fontStyles.subtitle3_b_15,
        height: '4.4rem',
        padding: '0.8rem 1.6rem',
      },
      add: {
        ...themeVars.fontStyles.title4_b_16,
        height: '5rem',
        padding: '0.8rem 1.6rem',
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'add', disabled: true },
      style: {
        backgroundColor: themeVars.color.gray400,
        cursor: 'not-allowed',
      },
    },
  ],
  defaultVariants: {
    disabled: false,
  },
});
