import { style, type StyleRule } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

const SAFE_TOP = 'var(--safe-area-top)';
const HEADER_HEIGHT = themeVars.size.height.header;
const FADE_TRANSITION = 'background-color 0.3s ease';

const headerBase: StyleRule = {
  ...themeVars.display.flexAlignCenter,
  height: `calc(${HEADER_HEIGHT} + ${SAFE_TOP})`,
  top: 0,
  width: '100%',
  maxWidth: 'var(--max-width)',
  padding: `${SAFE_TOP} 2rem 0`,
  justifyContent: 'space-between',
  zIndex: themeVars.zIndex.header.content,
  boxSizing: 'border-box',
};

export const container = style({
  ...headerBase,
  position: 'fixed',
  backgroundColor: 'transparent',
  transition: FADE_TRANSITION,
});

export const containerWhite = style({
  ...headerBase,
  position: 'fixed',
  backgroundColor: themeVars.color.white,
  transition: FADE_TRANSITION,
});

export const containerSticky = style({
  ...headerBase,
  position: 'sticky',
  backgroundColor: themeVars.color.white,
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
