import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { LAYOUT_HEIGHT } from '@shared/constants/layout';

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
  height: LAYOUT_HEIGHT.BOTTOM_NAVIGATION,
  flexShrink: 0,
});
