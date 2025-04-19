import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const listContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.5rem',
  alignSelf: 'stretch',
});

export const listImageContainer = style({
  width: '3rem',
  height: '3rem',
  flexShrink: 0,
  aspectRatio: '1/1',
});

export const listImage = style({
  borderRadius: '3rem',
});

export const listText = style({
  ...themeVars.fontStyles.body2_r_15,
  width: '100%',
  height: '3rem',
  color: themeVars.color.black,
  textOverflow: 'ellipsis',
});
