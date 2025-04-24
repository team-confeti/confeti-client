import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const stageBoxWrapper = style({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  minWidth: '10rem',
});

export const stageBox = style({
  ...themeVars.fontStyles.caption_r_10,
  ...themeVars.display.flexJustifyAlignCenter,
  textAlign: 'center',
  height: '4rem',
  width: '100%',
  padding: '0.4rem 1.4rem',
});

export const stageWrapper = style({
  ...themeVars.fontStyles.caption_r_10,
  display: 'flex',
  gap: '0.2rem',
  position: 'sticky',
  top: '0',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
  backdropFilter: 'blur(2px)',
  borderTop: themeVars.border.gray200,
  zIndex: 10,
  width: '100%',

  padding: '0.8rem 2rem',
  paddingLeft: '4.8rem',
  overflowX: 'auto',
  '::-webkit-scrollbar': {
    display: 'none',
  },

  scrollbarWidth: 'none',

  maxWidth: '47.7rem',
});
