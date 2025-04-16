import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  gap: '1.6rem',
});

export const image = style({
  width: '10rem',
  height: '14.2rem',
  objectFit: 'cover',
  borderRadius: 5,
});

export const info = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const title = style({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
  maxHeight: 'calc(1.3em * 2)',
  ...themeVars.fontStyles.body2_m_15,
});

export const description = style({
  ...themeVars.display.flexAlignCenter,
  marginBottom: '0.4rem',
  gap: '1rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body3_r_14,
});

export const button = style({
  margin: '2.4rem 0 -2.4rem',
  height: '5rem',
  ...themeVars.fontStyles.title4_b_16,
});
