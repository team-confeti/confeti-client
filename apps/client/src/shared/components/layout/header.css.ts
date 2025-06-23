import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexAlignCenter,
  position: 'sticky',
  backgroundColor: themeVars.color.white,
  height: themeVars.size.height.header,
  left: 0,
  top: 0,
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: themeVars.zIndex.header.content,
});

export const logo = style({
  cursor: 'pointer',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const button = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});
