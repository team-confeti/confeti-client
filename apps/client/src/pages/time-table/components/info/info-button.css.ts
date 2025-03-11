import { themeVars } from '@confeti/design-system/styles';
import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const shake = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '25%': { transform: 'rotate(-5deg)' },
  '50%': { transform: 'rotate(5deg)' },
  '75%': { transform: 'rotate(-5deg)' },
  '100%': { transform: 'rotate(0deg)' },
});

export const containerVariants = recipe({
  base: {
    ...themeVars.display.flexColumn,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
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
    ...themeVars.display.flexJustifyAlignCenter,
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
        objectFit: 'cover',
      },
      lg: {},
    },
    isClicked: {
      true: {
        border: '2.5px solid transparent',
        backgroundImage: `
        radial-gradient(circle at bottom, #ffffff 100%, rgba(255, 255, 255, 0) 100%),
        linear-gradient(to top,rgb(234, 255, 175) 30%,rgb(174, 225, 32) 100%)
      `,
        backgroundOrigin: 'border-box',
        backgroundClip: 'content-box, border-box',
        transition: 'background-image 0.4s ease, border-color 0.4s ease',
      },
    },
    isFestivalDeleteMode: {
      true: {
        animation: `${shake} 0.5s ease-in-out infinite`,
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
