import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const box = style({
  display: 'flex',
  flexDirection: 'column',
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
  width: '100%',
  height: '2px',
  position: 'absolute',
  left: 0,
  top: '4.2rem',
});

export const bar = style({
  position: 'absolute',
  left: 0,
  width: 'calc(20% - 1.8rem)', // width값 계산 애매.....
  height: '0.2rem',
  backgroundColor: themeVars.color.confeti_lime,
  transition: 'all 0.2s ease-in-out',
});
