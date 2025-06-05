import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  width: '100%',
  padding: '0.6rem 0 0.8rem 0',
  ...themeVars.display.flexAlignCenter,
});

export const image = style({
  width: '8rem',
  height: '8rem',
  borderRadius: '4rem',
  objectFit: 'cover',
  marginRight: '2rem',
});

export const textSection = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'center',
  textAlign: 'left',
  flex: 1,
  gap: '1.05rem',
});

export const name = style({
  ...themeVars.fontStyles.subtitle2_sb_16,
  color: themeVars.color.black,
});

export const likeButton = style({
  width: '7.2%',
  height: '7.2%',
  cursor: 'pointer',
});

export const releaseWrapper = style({
  display: 'flex',
  alignItems: 'flex-start',
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.gray500,
});
