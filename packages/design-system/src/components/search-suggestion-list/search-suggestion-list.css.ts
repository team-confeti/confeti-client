import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
  cursor: 'pointer',
});

export const listText = style({
  ...themeVars.fontStyles.body2_r_15,
  alignContent: 'center',
  width: '100%',
  height: '3rem',
  color: themeVars.color.black,
  textOverflow: 'ellipsis',
  cursor: 'pointer',
});

export const fallbackImage = style({
  width: '100%',
  height: '100%',
  borderRadius: '100%',
  objectFit: 'cover',
  cursor: 'pointer',
});

export const searchSuggestionListSection = recipe({
  base: {
    ...themeVars.display.flexColumn,
    alignItems: 'flex-start',
    gap: '2rem',
    width: '100%',
    height: 'auto',
    padding: '2rem',
  },
});
