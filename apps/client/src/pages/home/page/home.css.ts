import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const mainStyle = style({
  width: '100%',
  paddingTop: '3rem',
  background: themeVars.color.confeti_purple_grad,
});
