import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const box = style({
  ...themeVars.display.flexColumn,
});

export const container = recipe({
  base: [
    themeVars.fontStyles.subtitle3_sb_15,
    {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '4.4rem',
      padding: '0rem 2rem',
      gap: '1.8rem',
      zIndex: themeVars.zIndex.navigation.content,
      transition: 'background-color 0.3s ease',
    },
  ],
  variants: {
    theme: {
      transparent: {
        background: 'transparent',
      },
      white: {
        background: themeVars.color.white,
      },
    },
  },
  defaultVariants: {
    theme: 'transparent',
  },
});

export const list = recipe({
  base: {
    alignContent: 'center',
    padding: '0.8rem',
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    transition: 'color 0.4s ease',
  },
  variants: {
    active: {
      true: {},
      false: {},
    },
    theme: {
      transparent: {},
      white: {},
    },
  },
  compoundVariants: [
    // 투명 배경 + 활성
    {
      variants: { theme: 'transparent', active: true },
      style: { color: themeVars.color.confeti_lime },
    },
    // 투명 배경 + 비활성
    {
      variants: { theme: 'transparent', active: false },
      style: { color: themeVars.color.gray300 },
    },
    // 흰색 배경 + 활성
    {
      variants: { theme: 'white', active: true },
      style: { color: themeVars.color.confeti_lime3 },
    },
    // 흰색 배경 + 비활성
    {
      variants: { theme: 'white', active: false },
      style: { color: themeVars.color.black },
    },
  ],
  defaultVariants: {
    active: false,
    theme: 'transparent',
  },
});

export const underBar = recipe({
  base: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '0.2rem',
    transition: 'left 0.4s ease',
  },
  variants: {
    theme: {
      transparent: {
        backgroundColor: themeVars.color.confeti_lime,
      },
      white: {
        backgroundColor: themeVars.color.confeti_lime3,
      },
    },
  },
  defaultVariants: {
    theme: 'transparent',
  },
});

export const activeUnderBar = style({
  left: '100%',
});

export const secondTabUnderBar = style({
  left: '-50%',
});
