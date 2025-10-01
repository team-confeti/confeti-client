import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const dragHandle = style({
  cursor: 'grab',

  ':active': {
    cursor: 'grabbing',
  },
});

export const musicItemWrapper = recipe({
  base: {
    ...themeVars.display.flexBetweenAlignCenter,
    gap: '1.6rem',
    userSelect: 'none',
    selectors: {
      '&': {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      },
    },
  },
  variants: {
    appearance: {
      default: {
        padding: '1rem 0',
      },
      home: {
        padding: 0,
      },
    },
  },
});

export const contentWrapper = style({
  ...themeVars.display.flexBetweenAlignCenter,
  gap: '1.6rem',
  flexGrow: 1,
  minWidth: 0,
  cursor: 'pointer',
});

export const albumCoverWrapper = style({
  position: 'relative',
  width: '6.8rem',
  height: '6.8rem',
  flexShrink: 0,
});

export const albumCover = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '0.5rem',
});

export const albumOverlay = style({
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  borderRadius: '0.5rem',
});

export const minusBtn = style({
  ...themeVars.display.flexJustifyAlignCenter,
  backgroundColor: 'transparent',
  border: 'none',
});

export const textSection = style({
  flexGrow: 1,
  overflow: 'hidden',
});

export const title = recipe({
  base: {
    ...themeVars.fontStyles.title4_b_16,
    maxWidth: '21rem',
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginBottom: '0.4rem',
    userSelect: 'none',
    selectors: {
      '&': {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      },
    },
  },
  variants: {
    appearance: {
      default: {
        color: themeVars.color.gray800,
      },
      home: {
        color: themeVars.color.white,
      },
    },
  },
});

export const artist = recipe({
  base: {
    ...themeVars.fontStyles.body4_m_13,
    width: '100%',
    maxWidth: '21rem',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    lineHeight: '1.5rem',
    userSelect: 'none',
    selectors: {
      '&': {
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      },
    },
  },
  variants: {
    appearance: {
      default: {
        color: themeVars.color.gray600,
      },
      home: {
        color: themeVars.color.gray400,
      },
    },
  },
});

export const player = style({
  ...themeVars.display.flexJustifyAlignCenter,
  width: '4rem',
  height: '4rem',
  backgroundColor: themeVars.color.gray700,
  borderRadius: '200px',
});

export const rightIcon = style({});
