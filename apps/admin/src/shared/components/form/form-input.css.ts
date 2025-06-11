import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  gap: '0.5rem',
  flex: 1,
  minWidth: 0,
});

export const label = style({
  fontSize: themeVars.fontSize.body3,
  color: themeVars.color.gray800,
});

export const input = style({
  width: '100%',
  padding: '0.5rem 0.75rem',
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '6px',
  fontSize: themeVars.fontSize.body3,
  color: themeVars.color.gray900,
});

export const error = style({
  fontSize: themeVars.fontSize.body5,
  color: themeVars.color.confeti_red,
});
