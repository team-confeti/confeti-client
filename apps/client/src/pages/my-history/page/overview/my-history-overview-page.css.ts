import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const overviewContainer = style({
  padding: '2rem',
});

export const filterContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.5rem',
  alignSelf: 'stretch',
});

export const gridContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '1.8rem',
  rowGap: '3rem',
  marginTop: '2rem',
});
