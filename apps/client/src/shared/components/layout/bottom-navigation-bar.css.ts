import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

// fixed 탭바 높이(Figma 78px = 버튼 5.8rem + paddingBottom). spacer로 콘텐츠 가림 방지.
const BAR_HEIGHT = 'calc(5.8rem + max(2rem, env(safe-area-inset-bottom)))';

export const fixedWrapper = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  maxWidth: 'var(--max-width)',
  margin: '0 auto',
  zIndex: themeVars.zIndex.bottomNavigation.content,
});

export const spacer = style({
  width: '100%',
  height: BAR_HEIGHT,
  flexShrink: 0,
});
