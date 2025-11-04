import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  padding: '0 2rem',
});

export const item = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
  padding: '1.6rem 0',
});

export const avatar = style({
  width: '5rem',
  height: '5rem',
  borderRadius: '0.8rem',
  flexShrink: 0,
});

export const chip = style({
  padding: '0.4rem 0.8rem',
  marginBottom: '1rem',
  ...themeVars.fontStyles.caption_b_10,
  backgroundColor: themeVars.color.confeti_lime,
  color: themeVars.color.black,
  borderRadius: '10px',
  border: 'none',
});

export const title = style({
  ...themeVars.fontStyles.subtitle2_sb_16,
  color: themeVars.color.black,
  wordBreak: 'keep-all',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});
