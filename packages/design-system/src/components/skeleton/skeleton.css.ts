import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const shimmer = keyframes({
  '0%': { backgroundPosition: '100% 0' },
  '100%': { backgroundPosition: '-100% 0' },
});

export const skeleton = recipe({
  base: {
    display: 'inline-block',
    backgroundColor: themeVars.color.gray200,
    backgroundImage:
      'var(--skeleton_grad, linear-gradient(270deg, rgba(239, 240, 244, 0.00) 0%, #FFF 49.52%, rgba(239, 240, 244, 0.00) 100%))',
    backgroundSize: '200% 100%',
    backgroundRepeat: 'no-repeat',
    animation: `${shimmer} 1.5s infinite ease-in-out`,
  },
  variants: {
    variants: {
      default: {
        borderRadius: '0.5rem',
      },
      rounded: {
        borderRadius: '4rem',
      },
      rectangular: {
        borderRadius: '0.3rem',
      },
    },
  },
  defaultVariants: {
    variants: 'default',
  },
});
