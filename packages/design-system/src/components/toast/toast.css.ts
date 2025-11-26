import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const toastEnterFromBottom = keyframes({
  '0%': { opacity: 0, transform: 'translateY(100%)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const toastExitToBottom = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(100%)' },
});

const toastEnterFromTop = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-100%)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const toastExitToTop = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(-100%)' },
});

export const content = style({
  gap: '0.4rem',
  ...themeVars.display.flexJustifyAlignCenter,
});

export const text = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'pre-line',
  maxWidth: '30rem',
});

export const highlightText = style({
  color: themeVars.color.confeti_lime,
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '12rem',
  verticalAlign: 'bottom',
});

export const toastVariants = recipe({
  base: {
    width: '89%',
    '@media': {
      'screen and (min-width: 430px)': {
        width: '39rem',
      },
    },

    position: 'relative',
    padding: '0.8rem',

    ...themeVars.display.flexJustifyAlignCenter,
    borderRadius: 20,
    textAlign: 'center',
    zIndex: themeVars.zIndex.toast.content,
    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.15)',
    ...themeVars.fontStyles.body3_m_14,

    cursor: 'pointer',
    pointerEvents: 'auto',
    touchAction: 'auto',
  },
  variants: {
    isTopPosition: {
      true: {},
      false: {},
    },
    animation: {
      enter: {},
      exit: {},
    },
    color: {
      white: {
        backgroundColor: themeVars.color.white,
        color: themeVars.color.black,
      },
      black: {
        backgroundColor: themeVars.color.gray800,
        color: themeVars.color.white,
      },
    },
  },
  compoundVariants: [
    // Top Position + Animation
    {
      variants: { isTopPosition: true, animation: 'enter' },
      style: { animation: `${toastEnterFromTop} 0.5s ease-out forwards` },
    },
    {
      variants: { isTopPosition: true, animation: 'exit' },
      style: { animation: `${toastExitToTop} 0.5s ease-in forwards` },
    },

    // Bottom/Middle Position + Animation
    {
      variants: { isTopPosition: false, animation: 'enter' },
      style: { animation: `${toastEnterFromBottom} 0.5s ease-out forwards` },
    },
    {
      variants: { isTopPosition: false, animation: 'exit' },
      style: { animation: `${toastExitToBottom} 0.5s ease-in forwards` },
    },
  ],
  defaultVariants: {
    isTopPosition: false,
    color: 'white',
  },
});
