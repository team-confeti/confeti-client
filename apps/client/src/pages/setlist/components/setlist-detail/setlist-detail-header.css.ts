import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  padding: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray900,
});

export const editButton = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray600,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
});

export const editButtonDone = style({
  color: themeVars.color.confeti_lime3,
});
