import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexJustifyAlignCenter,
  width: '100%',
  height: '100%',
});

export const posterBg = style({
  width: '100%',
  position: 'relative',
});

export const poster = style({
  ...themeVars.zIndex.poster,
  position: 'absolute',
  borderRadius: '10px',
});
