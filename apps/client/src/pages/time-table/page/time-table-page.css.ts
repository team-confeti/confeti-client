import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  position: 'relative',
  height: 'calc(100dvh - 5rem)', // 헤더 높이 제외
  overflowY: 'auto', // Y축 스크롤 허용
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
