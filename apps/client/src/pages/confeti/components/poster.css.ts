import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  ...themeVars.display.flexCenter,
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
});
