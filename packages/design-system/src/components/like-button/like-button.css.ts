import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const heartAnimation = keyframes({
  '0%': { transform: 'scale(1)' },
  '50%': { transform: 'scale(1.2)', opacity: 0.8 },
  '100%': { transform: 'scale(1)', opacity: 1 },
});

export const likeButtonVariants = recipe({
  base: {
    width: '7.5%',
    height: '7.5%',
    cursor: 'pointer',
  },
  variants: {
    liked: {
      true: {
        animation: `${heartAnimation} 0.3s ease-in-out`,
        fill: '#FB0D0D',
      },
      false: {
        fill: '#93959D',
      },
    },
  },
});
