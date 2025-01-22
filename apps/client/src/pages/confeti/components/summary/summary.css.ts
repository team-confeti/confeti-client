import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '2.4rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const wrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2.5rem',
});

export const summary = style({
  ...themeVars.display.flexColumn,
  gap: '3rem',
});

export const titleWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
});

export const title = style({
  display: 'flex',
  gap: '1.6rem',
});

export const titleLeft = style({
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',

  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
});

export const subtitle = style({
  width: '100%',
  ...themeVars.fontStyles.body1_m_16,
  color: themeVars.color.gray600,
});

export const detail = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
});

export const detailItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const detailTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const detailContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});

export const linkBtn = style({
  cursor: 'pointer',
});

export const heartIcon = style({
  width: '2.4rem',
  height: '2.4rem',
  cursor: 'pointer',
  flexShrink: 0,
  marginLeft: '1rem',
});
