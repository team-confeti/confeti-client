import { recipe } from '@vanilla-extract/recipes';

export const root = recipe({
  base: {
    width: '100%',
    display: 'grid',
    gridTemplateRows: '0fr',
    transition: 'grid-template-rows 280ms ease',
  },
  variants: {
    isExpanded: {
      true: {
        gridTemplateRows: '1fr',
      },
      false: {
        gridTemplateRows: '0fr',
      },
    },
  },
});

export const content = recipe({
  base: {
    minHeight: 0,
    overflow: 'hidden',
    opacity: 0,
    transition: 'opacity 180ms ease',
  },
  variants: {
    isExpanded: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});
