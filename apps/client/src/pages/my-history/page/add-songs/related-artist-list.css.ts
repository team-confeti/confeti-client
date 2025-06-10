import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const relatedArtistContainer = style({
  display: 'flex',
  padding: '0 2rem',
  alignItems: 'center',
});

export const relatedArtistImg = style({
  width: '3rem',
  height: '3rem',
  borderRadius: '30px',
  marginRight: '1.5rem',
});

export const relatedArtistName = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
  marginRight: '1rem',
});

export const artistText = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray500,
});
