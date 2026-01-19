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
  justifyContent: 'space-between',
  padding: '1.6rem 0',
  cursor: 'pointer',
});

export const itemContent = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
  flex: 1,
});

export const avatar = style({
  flexShrink: 0,
  border: `1px solid ${themeVars.color.gray400}`,
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

export const content = style({
  flex: 1,
  ...themeVars.display.flexColumn,
  gap: '1rem',
});

/**
 * D-DAY 칩 스타일
 * 제목 위에 표시되는 작은 칩
 */
export const dDay = style({
  display: 'inline-block',
  padding: '0.4rem 0.8rem',
  ...themeVars.fontStyles.caption_b_10,
  backgroundColor: themeVars.color.confeti_lime,
  color: themeVars.color.gray900,
  borderRadius: '1rem',
  width: 'fit-content',
});

export const checkbox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  cursor: 'pointer',
});
