import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = recipe({
  base: {
    ...themeVars.display.flexColumn,
  },
  variants: {
    appearance: {
      home: {
        gap: '1.6rem',
        padding: '2rem',
        borderRadius: '0 0 10px 10px',
        background: themeVars.color.black_grad2,
      },
      default: {},
    },
  },
});
