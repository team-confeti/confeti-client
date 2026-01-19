import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

import { TIMETABLE_HEADER_HEIGHT } from '@pages/timetable/constants';

export const stageBoxWrapper = style({
  ...themeVars.display.flexJustifyAlignCenter,
  flex: 1,
  minWidth: '10rem',
});

export const stageBox = recipe({
  base: {
    ...themeVars.fontStyles.caption_r_10,
    ...themeVars.display.flexJustifyAlignCenter,
    textAlign: 'center',
    height: '4rem',
    width: '100%',
    padding: '0.4rem 1.4rem',
  },
  variants: {
    hasSingleStage: {
      true: {
        marginRight: '2.8rem',
      },
      false: {},
    },
  },
  defaultVariants: {
    hasSingleStage: false,
  },
});

export const stageWrapper = style({
  ...themeVars.fontStyles.caption_r_10,
  display: 'flex',
  gap: '0.2rem',
  position: 'sticky',
  top: TIMETABLE_HEADER_HEIGHT,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(2px)',
  backgroundColor: themeVars.color.white,

  zIndex: themeVars.zIndex.header.content,
  width: '100%',
  maxWidth: '47.7rem',

  padding: '0.8rem 1rem',
  paddingLeft: '3.8rem',

  overflowX: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  scrollbarWidth: 'none',
});
