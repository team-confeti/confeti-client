import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  padding: '1rem 2rem 3.2rem 2rem',
  gap: '2rem',
  flexGrow: 1,
});

export const performanceItem = style({
  display: 'flex',
  gap: '1.6rem',
  cursor: 'pointer',
});

export const image = style({
  width: '10rem',
  height: '14rem',
  objectFit: 'cover',
  borderRadius: '1rem',
});

export const info = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
  flex: 1,
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '0.8rem',
});

export const title = style({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
  maxHeight: 'calc(1.3em * 2)',
  flex: 1,
  ...themeVars.fontStyles.body2_m_15,
});

export const likeButtonWrapper = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});

export const likeButton = style({
  flexShrink: 0,
});

export const description = style({
  ...themeVars.display.flexAlignCenter,
  marginBottom: '0.4rem',
  gap: '1rem',
  color: themeVars.color.gray600,
  ...themeVars.fontStyles.body3_r_14,
});
