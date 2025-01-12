import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const container = style([
  themeVars.fontStyles.title5_b_15,
  {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '4.4rem',
    padding: '0rem 2rem',
    gap: '1.8rem',
  },
]);

export const list = recipe({
  base: {
    alignContent: 'center',
    padding: '0.8rem',
    cursor: 'pointer',
    height: '100%',
  },
  variants: {
    active: {
      true: {
        color: themeVars.color.black,
        borderBottom: `2px solid ${themeVars.color.confeti_lime}`,
        border: 'translateX(calc(100% + 1.8rem))',
      },
      false: {
        color: themeVars.color.gray500,
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});
