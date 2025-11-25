import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  flex: 1,
  padding: '0 2rem 2rem 2rem',
  overflowY: 'auto',
});

export const highlightText = style({
  color: themeVars.color.confeti_lime3,
  marginRight: '0.4rem',
});
