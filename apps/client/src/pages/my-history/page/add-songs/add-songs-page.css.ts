import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  height: 'calc(100dvh - 5rem)',
  display: 'flex',
  flexDirection: 'column',
});

export const searchBarContainer = style({
  padding: '0.8rem 2rem 0.8rem 2rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});

export const renderContentContainer = style({
  flex: 1,
});

export const buttonContainer = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white_grad,
});

export const musicListContainer = style({
  padding: '1rem 2rem 1rem 2rem',
  cursor: 'pointer',
});
