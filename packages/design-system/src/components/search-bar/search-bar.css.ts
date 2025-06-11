import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const arrowButton = style({
  cursor: 'pointer',
});

export const searchBar = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '3.8rem',
    padding: '1rem 1.2rem',
    backgroundColor: themeVars.color.gray200,
    borderRadius: '2.1rem',
  },
  variants: {
    type: {
      default: [themeVars.fontStyles.body2_m_15],
    },
  },
});

export const searchIcon = style({
  flexShrink: 0,
});

export const textSection = style({
  width: '100%',
  marginLeft: '0.6rem',
  backgroundColor: 'transparent',
  caretColor: themeVars.color.black,

  selectors: {
    '&::placeholder': {
      ...themeVars.fontStyles.body2_r_15,
      color: themeVars.color.gray500,
    },
    '&:focus': {
      outline: 'none',
    },
  },
});

export const closeBtn = style({
  cursor: 'pointer',
});
