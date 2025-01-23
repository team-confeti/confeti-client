import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '1rem 2rem',
  width: '100%',
});

export const wrapper = style({
  width: '100%',
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
  ...themeVars.display.flexColumnLeft,
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
  ...themeVars.display.flexAlignCenter,
  gap: '0.8rem',
});

export const releaseLabel = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray600,
});

export const releaseDate = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray600,
});
