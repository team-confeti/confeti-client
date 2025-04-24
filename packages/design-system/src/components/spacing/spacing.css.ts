import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const spacingVariants = recipe({
  base: {
    flex: 'none',
  },
  variants: {
    size: {
      sm: { height: '0.5rem' },
      md: { height: '1rem' },
      lg: { height: '2rem' },
      xl: { height: '3rem' },
      '2xl': { height: '4rem' },
    },
    color: {
      gray: { backgroundColor: themeVars.color.gray100 },
      white: { backgroundColor: themeVars.color.white },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'gray',
  },
});

export { spacingVariants };
