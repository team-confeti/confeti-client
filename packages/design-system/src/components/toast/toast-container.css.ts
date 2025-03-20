import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100vw',
  position: 'fixed',
  zIndex: themeVars.zIndex.toast.content,
});

export const toastPositionStyle = recipe({
  base: {},
  variants: {
    position: {
      bottomCenter: {
        alignItems: 'center',
        bottom: '5rem',
        left: 0,
      },
      bottomLeft: {
        alignItems: 'start',
        bottom: '5rem',
        left: '2rem',
      },
      bottomRight: {
        alignItems: 'end',
        bottom: '5rem',
        right: '2rem',
      },
      middleCenter: {
        alignItems: 'center',
        left: 0,
        bottom: '9.8rem',
      },
      topCenter: {
        alignItems: 'center',
        left: 0,
        top: '5em',
      },
      topLeft: {
        alignItems: 'start',
        left: '2rem',
        top: '5em',
      },
      topRight: {
        alignItems: 'end',
        right: '2rem',
        top: '5em',
      },
    },
  },
});
