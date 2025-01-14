import { themeVars } from '../../styles';
import { style } from '@vanilla-extract/css';

export const wrap = style({
  width: '33.5rem',
  height: '19.3rem',
});

export const container = style({
  ...themeVars.display.flexCenter,
  width: '33.5rem',
  height: '19.3rem',
  flexShrink: '0',
  padding: '1.6rem, 1.2rem',
  backgroundColor: themeVars.color.black,
});

export const info = style({
  ...themeVars.display.flexColumn,
  width: '31.1rem',
  height: '16.1rem',
  alignItems: 'flex-start',
  gap: '7.1rem',
  flexShrink: '0',
});

export const textSection = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  alignSelf: 'stretch',
});

export const infoDday = style({
  color: themeVars.color.white,
  ...themeVars.fontStyles.title1_b_24,
});

export const artist = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.confeti_lime,
});

export const subtitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.white,
});

export const infoBottom = style({
  ...themeVars.display.flexBetween,
});
