import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const buttonVariants = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.8rem',
    borderRadius: '1rem',
    backgroundColor: themeVars.color.confeti_lime,
    color: themeVars.color.gray800,
  },
  variants: {
    type: {
      default: {
        ...themeVars.fontStyles.subtitle4_b_14,
        width: '17.6rem',
        height: '3.9rem',
        padding: '1rem 3rem',
      },
      link: {
        ...themeVars.fontStyles.subtitle3_b_15,
        width: '33.5rem',
        height: '5rem',
        padding: '0.8rem 1.6rem',
      },
      add: {
        ...themeVars.fontStyles.title4_b_16,
        width: '33.5rem',
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
      variants: { type: 'add', disabled: true },
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
