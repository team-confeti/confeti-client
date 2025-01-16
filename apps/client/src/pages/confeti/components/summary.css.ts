import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '2.4rem 2rem',
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
});

export const summary = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
});

export const titleWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const title = style({
  display: 'flex',
  gap: '1.6rem',
});

export const subtitle = style({
  width: '100%',
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray600,
});

export const titleLeft = style({
  width: '100%',
  ...themeVars.fontStyles.title2_b_20,
  overflow: 'hidden',
  color: themeVars.color.black,
  textOverflow: 'ellipsis',
});

export const detail = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const date = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const dateTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const dateContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});

export const area = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const areaTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const areaContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});

export const reserveAt = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const reserveAtTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const reserveAtContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});
