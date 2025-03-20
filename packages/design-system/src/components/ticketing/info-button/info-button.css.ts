import { themeVars } from '../../../styles';
import { style } from '@vanilla-extract/css';

export const performanceInfo = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.white,
  display: 'flex',
  alignItems: 'center',
});
