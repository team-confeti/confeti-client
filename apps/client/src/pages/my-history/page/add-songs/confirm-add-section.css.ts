import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const headerContainer = style({
  position: 'relative',
  borderBottom: `0px`,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  padding: '1rem 2rem 1rem 2rem',
});

export const totalNumText = style({
  ...themeVars.fontStyles.title3_b_18,
});

export const confirmText = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray600,
});

export const buttonContainer = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white_grad,
  position: 'fixed',
  bottom: 0,
  left: '50%',
  right: 0,
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});
