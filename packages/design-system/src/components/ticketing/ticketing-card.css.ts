import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

export const imageField = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'space-between',
  width: '20rem',
  height: '20rem',
  padding: '2rem',
  borderRadius: '1rem',
  flexShrink: 0,
});

export const textField = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: '100%',
  alignItems: 'flex-start',
  gap: '0.4rem',
});

export const Dday = style({
  color: themeVars.color.white,
  ...themeVars.fontStyles.title1_b_24,
});

export const subTitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.confeti_lime,
  width: '16rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const performanceInfoButton = style({
  ...themeVars.display.flexAlignCenter,
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.white,
});
