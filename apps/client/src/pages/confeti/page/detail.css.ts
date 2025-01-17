import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  ...themeVars.display.flexColumn,
});
