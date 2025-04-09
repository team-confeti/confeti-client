import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const completeContentSection = recipe({
  base: {
    ...themeVars.display.flexColumn,
    width: '100%',
    height: '100vh',
  },
  variants: {
    phase: {
      description: {
        alignItems: 'center',
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
  display: 'flex',
  justifyContent: 'center',
});
