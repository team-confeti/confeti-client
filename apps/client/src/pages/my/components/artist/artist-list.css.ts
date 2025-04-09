import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexBetweenAlignCenterStretch,
  width: '100%',
  padding: '1rem 2rem',
});

export const artistInfo = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.4rem',
  alignItems: 'center',
});

export const info = style({
  ...themeVars.display.flexColumn,
  gap: '0.4rem',
});

export const title = style({
  ...themeVars.fontStyles.subtitle3_sb_15,
});

export const date = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray600,
});

export const likeButton = style({
  width: '7.2%',
  height: '7.2%',
  cursor: 'pointer',
});
