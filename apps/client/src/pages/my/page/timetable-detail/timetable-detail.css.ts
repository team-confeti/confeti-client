import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  position: 'relative',
  overflowY: 'auto',
});

export const timeTableWrapper = style({
  maxWidth: '47.7rem',
  backgroundColor: themeVars.color.white,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  padding: '0rem',
});
