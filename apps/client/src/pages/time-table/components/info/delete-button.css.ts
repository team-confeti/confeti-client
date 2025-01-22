import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
