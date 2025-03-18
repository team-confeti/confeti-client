import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const artist = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  gap: '1.2rem',
});

export const artistImageContainer = style({
  width: '7rem',
  height: '7rem',
  borderRadius: '3.5rem',
  overflow: 'hidden',
  backgroundColor: themeVars.color.gray100,
});

export const artistImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray800,
  width: '7rem',
  height: '1.4rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
});
