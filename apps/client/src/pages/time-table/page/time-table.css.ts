import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const festivalBtnWrapper = style({
  position: 'relative',
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  width: '25%',
  height: '10.6rem',
  gap: '1.2rem',
});

export const closeBtn = recipe({
  base: {
    position: 'absolute',
    top: '0rem',
    right: '1rem',
    cursor: 'pointer',
  },
  variants: {
    isFestivalDeleteMode: {
      true: {},
      false: {
        display: 'none',
      },
    },
  },
});
