import { keyframes, style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';
import { recipe } from '@vanilla-extract/recipes';

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

export const toastVariants = recipe({
  base: {
    position: 'relative',
    width: '32.5rem',
    height: '5rem',

    ...themeVars.display.flexJustifyAlignCenter,
    borderRadius: '5rem',
    backgroundColor: themeVars.color.gray800,
    color: themeVars.color.confeti_lime2,
    textAlign: 'center',
    zIndex: themeVars.zIndex.toast.content,
    ...themeVars.fontStyles.body2_m_15,

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
  },
});
