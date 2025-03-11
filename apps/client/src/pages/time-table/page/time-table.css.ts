import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const festivalBtnWrapper = style({
  position: 'relative',
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  width: '25%',
  height: '10.6rem',
  gap: '1.2rem',
});
