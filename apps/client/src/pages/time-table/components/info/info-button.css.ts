import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const containerVariants = recipe({
  base: {
    ...themeVars.display.flexColumnStart,
    background: themeVars.color.white,
  },
  variants: {
    size: {
      sm: {},
      md: {
        padding: '2.4rem 2rem',
      },
      lg: {},
    },
  },
});

export const ItemContainer = recipe({
  base: {
    width: '100%',
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  variants: {
    size: {
      sm: {},
      md: {
        gap: '1.3rem',
      },
      lg: {},
    },
  },
});

export const ItemsVariants = recipe({
  base: {
    ...themeVars.display.flexColumn,
    alignItems: 'center',
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '25%',
        height: '10.6rem',
        gap: '1.2rem',
      },
      lg: {},
    },
  },
});

export const ImageVariants = recipe({
  base: {
    ...themeVars.display.flexCenter,
    border: themeVars.border.gray400,
    background: themeVars.color.white,
    flexShrink: '0',
    borderRadius: '3rem',
    cursor: 'pointer',
  },
  variants: {
    size: {
      sm: {},
      md: {
        width: '6rem',
        height: '6rem',
      },
      lg: {},
    },
    isClicked: {
      true: {
        border: '2px solid transparent',
        backgroundImage:
          'linear-gradient(#ffffff, #ffffff), linear-gradient(to top, #E9FFAC 0%, #B5F602 100%)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        transition: 'background-image 0.3s ease, border-color 0.3s ease',
      },
    },
  },
});

export const TextVariants = recipe({
  base: {
    display: '-webkit-box',
    width: '7.4rem',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    wordBreak: 'keep-all',
    whiteSpace: 'pre-line',
  },
  variants: {
    size: {
      sm: {},
      md: {
        ...themeVars.fontStyles.subtitle5_sb_12,
      },
      lg: {},
    },
    color: {
      gray: {
        color: themeVars.color.gray600,
      },
      black: {
        color: themeVars.color.black,
      },
    },
  },
});
