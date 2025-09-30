import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  padding: '2rem',
  gap: '0.8rem',
  backgroundColor: themeVars.color.gray700,
  borderRadius: '10px 10px 0 0',
});

export const container = style({
  display: 'flex',
  width: '100%',
  gap: '1.6rem',
});

export const poster = style({
  width: '10rem',
  height: '14.2rem',
  backgroundColor: 'white',
  borderRadius: '10px',
});

export const textSection = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'center',
  gap: '1.6rem',
  flex: '1 0 0',
});

export const title = style({
  ...themeVars.fontStyles.subtitle2_sb_16,
  color: themeVars.color.white,

  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const buttonSection = style({
  ...themeVars.display.flexAlignCenter,
});

export const buttonText = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.white,
});
