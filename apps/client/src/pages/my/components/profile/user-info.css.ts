import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  padding: '3rem 2rem',
  gap: '1.8rem',
  backgroundColor: themeVars.color.gray100,
});

export const profileWrapper = style({
  position: 'relative',
});

export const editIcon = style({
  position: 'absolute',
  bottom: 0,
  right: '0.1rem',
  width: '2.4rem',
  height: '2.4rem',
  padding: '0.4rem',
  backgroundColor: themeVars.color.white,
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.15)',
  borderRadius: '12px',
  border: `0.6px solid ${themeVars.color.gray200}`,
  cursor: 'pointer',
  backgroundColor: themeVars.color.gray100,
});

export const userInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const titleWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const titlePostfix = style({
  ...themeVars.fontStyles.body1_r_16,
});

export const arrowIcon = style({
  width: '1.6rem',
  height: '1.6rem',
  cursor: 'pointer',
});
