import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { TIMETABLE_HEADER_HEIGHT } from '@pages/timetable/constants';

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  padding: '0 2rem',
  paddingTop: 'var(--safe-area-top)',
  height: `calc(${TIMETABLE_HEADER_HEIGHT} + var(--safe-area-top))`,
  background: themeVars.color.black_grad2,
  zIndex: themeVars.zIndex.header.content,
});

export const title = style({
  ...themeVars.fontStyles.subtitle2_sb_16,
  color: themeVars.color.white,
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: themeVars.color.white,
});
