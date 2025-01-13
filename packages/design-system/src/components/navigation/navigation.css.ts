// navigation.css.ts
import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';
import { recipe } from '@vanilla-extract/recipes';

export const box = style({
  ...themeVars.display.flexColumn,
});

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
    position: 'relative',
    transition: 'color 0.4s ease',
  },
  variants: {
    active: {
      true: {
        color: themeVars.color.black,
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

export const underBar = style({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '2px',
  backgroundColor: themeVars.color.confeti_lime,
  transition: 'left 0.4s ease',
});

export const activeUnderBar = style({
  left: '100%',
});

export const secondTabUnderBar = style({
  left: '-50%',
});
