import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const myRecordContainer = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: '100dvh',
  flex: 1,
});
