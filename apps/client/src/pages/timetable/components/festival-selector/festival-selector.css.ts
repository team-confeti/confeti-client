import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const festivalSelectorWrapper = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '13.8rem',
  padding: '1.6rem 2rem',
});

export const festivalButtonsWrapper = style({
  display: 'flex',
  gap: '1.4rem',
  overflow: 'scroll',
});

export const dropdownContainer = style({
  position: 'absolute',
  right: '5rem',
});

export const meatballButton = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    width: '3rem',
    height: '3rem',
    borderRadius: '0.5rem',
    border: `1px solid ${themeVars.color.gray200}`,
    background: themeVars.color.white,
    boxShadow: `0px 0px 6px 0px rgba(0, 0, 0, 0.15)`,
    cursor: 'pointer',
  },
  variants: {
    isOpen: {
      true: {
        border: `1px solid ${themeVars.color.confeti_lime3}`,
      },
      false: {},
    },
  },
});
