import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../../styles';

export const dotIndicatorVariants = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    gap: '0.4rem',
  },
});

export const dotVariants = recipe({
  base: {
    width: '0.6rem',
    height: '0.6rem',
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
    backgroundColor: themeVars.color.white_op_30,
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: '0',
    position: 'relative',
    ':hover': {
      backgroundColor: themeVars.color.white_op_30,
      opacity: 0.8,
    },
  },
  variants: {
    active: {
      true: {
        width: '2.4rem',
        borderRadius: '3px',
      },
      false: {},
    },
    tone: {
      dark: {
        backgroundColor: themeVars.color.white_op_30,
        ':hover': {
          backgroundColor: themeVars.color.white_op_30,
          opacity: 0.8,
        },
        selectors: {
          '&[aria-selected="true"]': {
            backgroundColor: themeVars.color.white,
          },
          '&[aria-selected="true"]:hover': {
            backgroundColor: themeVars.color.white,
            opacity: 0.9,
          },
        },
      },
      light: {
        backgroundColor: themeVars.color.gray300,
        ':hover': {
          backgroundColor: themeVars.color.gray300,
          opacity: 0.8,
        },
        selectors: {
          '&[aria-selected="true"]': {
            backgroundColor: themeVars.color.confeti_lime,
          },
          '&[aria-selected="true"]:hover': {
            backgroundColor: themeVars.color.confeti_lime,
            opacity: 0.9,
          },
        },
      },
    },
  },
  defaultVariants: {
    active: false,
    tone: 'dark',
  },
});
