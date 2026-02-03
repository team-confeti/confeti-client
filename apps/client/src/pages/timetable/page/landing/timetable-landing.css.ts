import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const landingWrapper = style({
  position: 'relative',
  width: '100%',
  ...themeVars.display.flexColumn,
});

export const navTabsWrapper = style({
  width: '100%',
});

export const contentArea = style({
  position: 'relative',
  backgroundColor: themeVars.color.white,
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem',
  marginTop: '-2rem',
  flex: 1,
  minHeight: 'calc(100vh - 43.1rem)',
  padding: '2rem',
  boxSizing: 'border-box',
  zIndex: 10,
});
