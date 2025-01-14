import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  padding: '3rem 2rem',
  gap: '1.8rem',
});

export const img = style({
  width: '8rem',
  height: '8rem',
  borderRadius: '50%',
  objectFit: 'cover',
});

export const userInfo = style({
  marginBottom: '1rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const titleWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export const titlePostfix = style({
  ...themeVars.fontStyles.body1_r_16,
});
