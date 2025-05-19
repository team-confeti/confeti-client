import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const ArtistTitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
});
