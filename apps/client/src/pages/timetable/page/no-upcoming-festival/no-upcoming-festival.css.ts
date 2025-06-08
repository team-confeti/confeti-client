import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5rem',
  height: 'calc(100dvh - 18.8rem)',
  padding: '0 2rem',
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '3rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.6rem',
});

export const mainText = style({
  color: themeVars.color.black,
  ...themeVars.fontStyles.title3_b_18,
});

export const subText = style({
  color: themeVars.color.gray500,
  ...themeVars.fontStyles.body2_r_15,
});

export const buttonText = style({
  color: themeVars.color.confeti_lime3,
  ...themeVars.fontStyles.body3_m_14,
  textDecoration: 'underline',
  textDecorationColor: themeVars.color.confeti_lime3,
  textDecorationThickness: '1px',
  textUnderlineOffset: '0.13em',
  cursor: 'pointer',
});

export const buttonSection = style({
  background: themeVars.color.white_grad,
  position: 'fixed',
  padding: '2rem',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});
