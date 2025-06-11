import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  padding: '0.4rem 0 1.6rem 0',
});

export const poster = style({
  width: '10rem',
  height: '14.2rem',
  borderRadius: '1rem',
  objectFit: 'cover',
  marginRight: '1.6rem',
});

export const textSection = style({
  flex: 1,
  ...themeVars.display.flexColumn,
  gap: '0.5rem',
  textAlign: 'left',
  width: '10%',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  marginBottom: '1.6rem',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  whiteSpace: 'normal',
  wordBreak: 'keep-all',
  overflowWrap: 'break-word',
  cursor: 'pointer',
});

export const infoRow = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1rem',
});

export const infoText = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray600,
  bottom: '1rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
});

export const heartIcon = style({
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
});

export const likeButton = style({
  width: '7.2%',
  height: '7.2%',
  cursor: 'pointer',
});
