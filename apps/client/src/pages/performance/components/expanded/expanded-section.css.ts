import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const expandedSection = style({
  ...themeVars.display.flexColumn,
  position: 'relative',
});

export const expandedArtists = style({
  overflow: 'hidden',
  transition: 'max-height 0.5s ease-out, opacity 0.3s ease, padding 0.3s ease',
  maxHeight: 0,
  opacity: 0,
  padding: '0 2rem',
});

export const expandedArtistsVisible = style({
  maxHeight: '15rem',
  opacity: 1,
  padding: '2rem',
});
