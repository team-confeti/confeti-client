import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexAlignCenter,
  position: 'fixed',
  backgroundColor: 'transparent',
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)',
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: themeVars.zIndex.header.content,
  transition: 'background-color 0.3s ease',
});

export const containerWhite = style({
  ...themeVars.display.flexAlignCenter,
  position: 'fixed',
  backgroundColor: themeVars.color.white,
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)',
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: themeVars.zIndex.header.content,
  transition: 'background-color 0.3s ease',
});

export const containerSticky = style({
  ...themeVars.display.flexAlignCenter,
  position: 'sticky',
  backgroundColor: themeVars.color.white,
  height: themeVars.size.height.header,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)',
  padding: '0 2rem',
  justifyContent: 'space-between',
  zIndex: themeVars.zIndex.header.content,
});

export const logo = style({
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  position: 'relative',
  zIndex: 1,
});

export const button = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});
