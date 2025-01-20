import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const expandedSection = style({
  ...themeVars.display.flexColumn,
});

export const expandedArtists = style({
  backgroundColor: themeVars.color.gray100,
  padding: '2rem',
});
