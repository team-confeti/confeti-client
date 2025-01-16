import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  ...themeVars.display.flexColumn,
  gap: '1rem',
  backgroundColor: themeVars.color.gray100,
});
