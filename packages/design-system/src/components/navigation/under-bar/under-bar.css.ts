import { style } from '@vanilla-extract/css';
import { themeVars } from '../../../styles';

export const underBar = style({
  width: '100%',
  height: '2px',
  backgroundColor: themeVars.color.confeti_lime,
  position: 'absolute',
  left: 0,
  bottom: 0,
});
