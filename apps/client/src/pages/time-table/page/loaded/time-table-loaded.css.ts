import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  position: 'relative',
  height: 'calc(100dvh - 5rem)', // 헤더 높이 제외
  overflowY: 'auto', // Y축 스크롤 허용
});

export const actionsWrapper = style({
  display: 'flex',
  padding: '2rem',
  gap: '0.8rem',
  background: themeVars.color.white_grad,
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});

export const downloadButton = style({
  padding: '0rem',
});

export const editButton = style({
  color: themeVars.color.confeti_lime2,
  backgroundColor: themeVars.color.gray800,
});

export const timeTableWrapper = style({
  maxWidth: '47.7rem',
  backgroundColor: themeVars.color.white,
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  padding: '0rem',
});
