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

export const icon = style({
  width: '2.4rem',
  height: '2.4rem',
});

export const content = style({
  gap: '0.4rem',
  ...themeVars.display.flexCenter,
});

export const toast = recipe({
  base: {
    position: 'fixed',
    width: '32.5rem',
    height: '5rem',

    ...themeVars.display.flexCenter,
    transform: 'translateX(-50%)',
    borderRadius: '5rem',
    backgroundColor: themeVars.color.gray800,
    color: themeVars.color.confeti_lime2,
    textAlign: 'center',
    zIndex: themeVars.zIndex.toast.content,
    ...themeVars.fontStyles.body2_m_15,
  },
  variants: {
    position: {
      topCenter: { top: '0rem' },
      bottomCenter: { bottom: '0rem' },
      middleCenter: { bottom: '0rem' },
    },
    animation: {
      enter: {
        animation: `${toastEnterFromBottom} 0.5s ease-out forwards`,
      },
      exit: {
        animation: `${toastExitToBottom} 0.5s ease-in forwards`,
      },
    },
  },
  defaultVariants: {
    animation: 'enter',
  },
});
