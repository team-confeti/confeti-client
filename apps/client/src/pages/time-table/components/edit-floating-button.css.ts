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
  padding: '1rem 5.3rem 0.9rem 1.6rem',
  bottom: '17rem',
  right: '2rem',

  ...themeVars.display.flexCenter,

  position: 'absolute',
  zIndex: themeVars.zIndex.floatingButton.content,
  transition: 'width 0.3s ease-in-out',
  ...themeVars.fontStyles.subtitle4_b_14,
  flexDirection: 'column',
  alignItems: 'flex-start',

  borderRadius: '0.5rem',
  backgroundColor: themeVars.color.white,

  animation: `${fadeInBox} 0.3s ease-out`,
});

export const boxButton = style({
  ...themeVars.display.flexCenter,
  padding: '0.8rem 0',
  cursor: 'pointer',
});

export const buttonVariants = recipe({
  base: {
    height: '5rem',
    position: 'absolute',
    right: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  transform: 'translateX(-50%)',
  width: '100%',
  height: 'var(--height)',
  maxWidth: 'var(--max-width)',
  minWidth: 'var(--min-width)',
  transition: 'background-color 0.3s ease-in-out',
});

// 전체 뷰포트
// export const background = style({
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100vw',
//   height: '100vh',
//   zIndex: themeVars.zIndex.floatingButton.content,
//   transition: 'background-color 0.3s ease-in-out',
// });

export const backgroundVisible = style({
  backgroundColor: themeVars.color.black_op,
  zIndex: themeVars.zIndex.floatingButton.content,
});
