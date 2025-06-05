import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const listContentContainer = style({
  ...themeVars.display.flexJustifyAlignCenter,
  minWidth: '6.8rem',
  height: '6.8rem',
  gap: '1.6rem',
  flexGrow: 1,
});

export const listContainer = style({
  ...themeVars.display.flexJustifyAlignCenter,
  gap: '1.6rem',
  padding: '1rem 0rem',
});

export const listTextItems = style({
  width: 'auto',
});

export const listImageItems = style({
  width: '100%',
  maxWidth: '6.8rem',
});
