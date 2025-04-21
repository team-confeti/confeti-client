import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { screen, themeVars } from '../../styles';

export const avatarVariants = recipe({
  base: {
    position: 'relative',
    borderRadius: '100%',
    overflow: 'hidden',
    WebkitUserSelect: 'none',
  },
  variants: {
    size: {
      xs: {
        width: '3rem',
        height: '3rem',
        ...screen.md({
          width: '3.2rem',
          height: '3.2rem',
        }),
        ...screen.lg({
          width: '3.44rem',
          height: '3.44rem',
        }),
      },
      sm: {
        width: '5.6rem',
        height: '5.6rem',
        ...screen.md({
          width: '5.95rem',
          height: '5.95rem',
        }),
        ...screen.lg({
          width: '6.23rem',
          height: '6.23rem',
        }),
      },
      md: {
        width: '6rem',
        height: '6rem',
        ...screen.md({
          width: '6.4rem',
          height: '6.4rem',
        }),
        ...screen.lg({
          width: '6.72rem',
          height: '6.72rem',
        }),
      },
      lg: {
        width: '7rem',
        height: '7rem',
        ...screen.md({
          width: '7.4rem',
          height: '7.4rem',
        }),
        ...screen.lg({
          width: '7.76rem',
          height: '7.76rem',
        }),
      },
      xl: {
        width: '8rem',
        height: '8rem',
        ...screen.md({
          width: '8.3rem',
          height: '8.3rem',
        }),
        ...screen.lg({
          width: '8.56rem',
          height: '8.56rem',
        }),
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const imgVariants = recipe({
  base: {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    objectFit: 'cover',
    cursor: 'pointer',
  },
});

export const fallback = recipe({
  base: {
    width: '100%',
    height: '100%',
    borderRadius: '100%',
    backgroundColor: themeVars.color.gray100,
    ...themeVars.display.flexJustifyAlignCenter,
  },
});

export const overlay = style(themeVars.overlay.default);

export const icon = style({
  width: '2.8rem',
  height: '2.8rem',
});
