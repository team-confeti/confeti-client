import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';

export const container = style({
  ...themeVars.display.flexCenter,
  padding: '0.8rem 2rem',
  width: '100%',
  gap: '0.8rem',
  backgroundColor: themeVars.color.white,
});

export const frame = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
});

export const searchBar = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '3.8rem',
    padding: '1rem 1.2rem',
    borderRadius: '2.1rem',
    border: themeVars.border.black,
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
  caretColor: themeVars.color.confeti_lime,

  selectors: {
    '&::placeholder': {
      color: themeVars.color.gray400,
    },
    '&:focus': {
      outline: 'none',
    },
  },
});

export const closeBtn = style({
  cursor: 'pointer',
});
