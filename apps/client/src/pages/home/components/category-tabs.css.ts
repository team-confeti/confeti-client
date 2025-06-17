import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  position: 'sticky',
  top: themeVars.size.height.header,
  zIndex: themeVars.zIndex.header.content,
  background: themeVars.color.white,
});

export const chipList = style({
  display: 'flex',
  gap: '0.8rem',
  padding: '0.8rem 2rem',
});
