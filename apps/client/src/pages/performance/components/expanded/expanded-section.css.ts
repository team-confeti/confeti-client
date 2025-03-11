import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const expandedSection = style({
  ...themeVars.display.flexColumn,
  position: 'relative',
});

export const expandedArtists = style({
  backgroundColor: themeVars.color.gray200,
  overflow: 'hidden',
  transition: 'height 0.5s ease-out, opacity 0s ease-out',
  opacity: 0,
  padding: '0 2rem',
});

export const expandedArtistsVisible = style({
  opacity: 1,
  padding: '2rem',
});
