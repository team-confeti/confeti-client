import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  flex: 1,
});

export const text = style({
  marginRight: '0.2rem',
  color: themeVars.color.confeti_lime3,
});

export const skeletonWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '1.6rem',
});
