import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const toggleContainer = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
    borderRadius: '10px',
    width: '3.6rem',
    height: '2rem',
    padding: '0.2rem',
  },
  variants: {
    checked: {
      true: {
        backgroundColor: themeVars.color.gray800,
      },
      false: {
        backgroundColor: themeVars.color.gray300,
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
      false: {},
    },
  },
  defaultVariants: {
    checked: false,
    disabled: false,
  },
});

export const toggleThumb = recipe({
  base: {
    backgroundColor: themeVars.color.white,
    borderRadius: '50%',
    transition: 'transform 0.25s ease-in-out',
    boxShadow: themeVars.shadowStyles.shadow_toggle.boxShadow,
    width: '1.6rem',
    height: '1.6rem',
  },
  variants: {
    checked: {
      true: {
        transform: 'translateX(1.6rem)',
      },
      false: {
        transform: 'translateX(0)',
      },
    },
  },
  defaultVariants: {
    checked: false,
  },
});

export const toggleInput = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
});
