import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const artist = style({
  ...themeVars.display.flexColumnCenter,
  gap: '1.2rem',
});

export const artistImage = style({
  width: '7rem',
  height: '7rem',
  borderRadius: '3.5rem',
  overflow: 'hidden',
  backgroundColor: themeVars.color.gray100,
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray800,
  width: '7rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
});
