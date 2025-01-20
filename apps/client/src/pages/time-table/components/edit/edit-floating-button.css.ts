import { recipe } from '@vanilla-extract/recipes';
import { keyframes, style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

const fadeInBox = keyframes({
  from: { opacity: 0, transform: 'translateY(80%)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeInText = keyframes({
  from: { opacity: 0, transform: 'translateY(20%)' },
  to: { opacity: 1, transform: 'translateY(0)' },
});

const fadeOutText = keyframes({
  from: { opacity: 1, transform: 'translateY(0)' },
  to: { opacity: 0, transform: 'translateY(20%)' },
});

export const box = style({
  ...themeVars.display.flexCenter,
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '1rem 5.3rem 0.9rem 1.6rem',

  position: 'absolute',
  bottom: '17rem',
  right: '2rem',

  ...themeVars.fontStyles.subtitle4_b_14,
  borderRadius: '0.5rem',
  backgroundColor: themeVars.color.white,
  zIndex: themeVars.zIndex.floatingButton.content,

  transition: 'width 0.3s ease-in-out',
  animation: `${fadeInBox} 0.3s ease-out`,
});

export const boxButton = style({
  ...themeVars.display.flexCenter,
  padding: '0.8rem 0',
  cursor: 'pointer',
});

export const buttonVariants = recipe({
  base: {
    ...themeVars.display.flexCenter,
    height: '5rem',
    position: 'absolute',
    right: '2rem',

    borderRadius: '3rem',
    backgroundColor: themeVars.color.gray800,
    zIndex: themeVars.zIndex.floatingButton.content,
    transition: 'width 0.3s ease-in-out',
    cursor: 'pointer',
  },
  variants: {
    variant: {
      close: {
        bottom: '11rem',
        padding: '1.3rem',
        width: '5rem',
      },
      edit: {
        bottom: '11rem',
        padding: '0.5rem',
        width: '11rem',
      },
      complete: {
        bottom: '2rem',
        padding: '0.5rem',
        width: '11rem',
        gap: '0.2rem',
      },
    },
  },
  defaultVariants: {
    variant: 'edit',
  },
});

export const text = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.confeti_lime2,
  whiteSpace: 'nowrap',
  transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
});

export const textVisible = style({
  animation: `${fadeInText} 0.3s ease-out`,
});

export const textHidden = style({
  animation: `${fadeOutText} 0.3s ease-in`,
  opacity: 0,
});

export const background = style({
  position: 'fixed',
  top: 0,
  left: '50%',
  width: '100%',
  height: 'var(--height)',
  maxWidth: 'var(--max-width)',
  minWidth: 'var(--min-width)',
  transform: 'translateX(-50%)',
  transition: 'background-color 0.3s ease-in-out',
  zIndex: themeVars.zIndex.floatingButton.content,
});

export const backgroundVisible = style({
  backgroundColor: themeVars.color.black_op,
  zIndex: themeVars.zIndex.floatingButton.content,
});
