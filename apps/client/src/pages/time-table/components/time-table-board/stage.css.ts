import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const stageBox = style({
  ...themeVars.fontStyles.caption_r_10,
  ...themeVars.display.flexJustifyAlignCenter,
  textAlign: 'center',
  height: '4rem',
  padding: '0.4rem 1.4rem',
  flex: 1,
  minWidth: 'fit-content',
});

export const stageWrapper = style({
  ...themeVars.fontStyles.caption_r_10,
  display: 'flex',
  gap: '0.2rem',
  position: 'sticky',
  top: 0,
  backgroundColor: themeVars.color.white_op_20,
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(2px)',
  borderTop: themeVars.border.gray200,
  zIndex: 10,
  width: '100%',
  marginBottom: '1.2rem',
  padding: '0.8rem 2rem',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  maxWidth: '47.7rem',
});
