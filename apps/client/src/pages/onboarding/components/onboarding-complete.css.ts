import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const completeContentSection = recipe({
  base: {
    ...themeVars.display.flexColumn,
    width: '100%',
    height: `100dvh`,
  },
  variants: {
    phase: {
      loading: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      description: {
        textAlign: 'center',
        justifyContent: 'center',
      },
      cta: {
        padding: '2rem',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'space-between',
      },
    },
  },
});

export const confetiLogo = style({
  ...themeVars.display.flexJustifyAlignCenter,
});

export const logoImage = style({
  width: '18rem',
  height: '18rem',
});

export const button = style({
  flexShrink: 0,
});
