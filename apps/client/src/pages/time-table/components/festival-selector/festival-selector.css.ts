import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const festivalSelectorWrapper = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '13.8rem',
  padding: '1.6rem 2rem',
});

export const festivalButtonsWrapper = style({
  display: 'flex',
  gap: '1.4rem',
  overflow: 'scroll',
});

export const dropdownContainer = style({
  position: 'absolute',
  right: '4.4rem',
});
