import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexAlignCenter,
  position: 'relative',
  backgroundColor: themeVars.color.white,
  height: '4.4rem',
  padding: '0 1.4rem',
  borderBottom: themeVars.border.gray300,
});

export const button = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
});

export const rightIcon = style({
  position: 'absolute',
  right: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
