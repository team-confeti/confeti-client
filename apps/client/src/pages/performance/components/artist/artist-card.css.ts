import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const artist = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  gap: '1.2rem',
  padding: 0,
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray800,
  width: '7.4rem',
  height: '1.4rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
});
