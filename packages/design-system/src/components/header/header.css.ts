import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';
import { recipe } from '@vanilla-extract/recipes';

export const container = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    height: '5rem',
    backgroundColor: themeVars.color.white,
  },
  variants: {
    variant: {
      default: {
        justifyContent: 'space-between',
        padding: '0.8rem 2rem',
      },
      detail: {
        padding: '1.2rem 0 1.2rem 2rem',
        borderBottom: themeVars.border.gray300,
      },
    },
  },
});

export const logo = style({
  width: '9.7059rem',
  height: '100%',
  cursor: 'pointer',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const button = recipe({
  base: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  variants: {
    variant: {
      default: {
        width: '2.4rem',
        height: '2.4rem',
      },
      back: {
        width: '2rem',
        height: '2rem',
        position: 'absolute',
      },
    },
  },
});

export const icon = style({
  width: '100%',
  height: '100%',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
