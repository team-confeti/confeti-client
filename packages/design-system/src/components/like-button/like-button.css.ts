import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const heartAnimation = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.2)', opacity: 0.7 },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

export const likeButtonVariants = recipe({
  base: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  variants: {
    liked: {
      true: {
        fill: '#FB0D0D',
      },
      false: {
        fill: '#93959D',
      },
    },
    animate: {
      true: {
        animation: `${heartAnimation} 0.3s ease-in-out`,
      },
    },
  },
});
