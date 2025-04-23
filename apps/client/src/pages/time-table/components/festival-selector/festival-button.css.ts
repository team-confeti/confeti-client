import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const buttonContainer = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'center',
  alignItems: 'center',
  width: '7.4rem',
  gap: '1.2rem',
});

export const festivalButton = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    border: themeVars.border.gray400,
    background: themeVars.color.white,
    flexShrink: '0',
    borderRadius: '3rem',
    width: '6rem',
    height: '6rem',
    objectFit: 'cover',
    overflow: 'hidden',
  },
  variants: {
    isSelected: {
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
    // isFestivalDeleteMode: {
    //   true: {},
    // },
  },
});

export const text = style({
  display: '-webkit-box',
  width: '7.4rem',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: '2',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  wordBreak: 'keep-all',
  whiteSpace: 'pre-line',
  color: themeVars.color.black,
  ...themeVars.fontStyles.subtitle5_sb_12,
});

export const checkBox = style({
  appearance: 'none',
  borderRadius: '3rem',
  width: '2.2rem',
  height: '2.2rem',
  border: `1px solid ${themeVars.color.gray400}`,
});
