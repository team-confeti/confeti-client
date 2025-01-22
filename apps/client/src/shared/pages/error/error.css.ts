import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexCenter,
  flexDirection: 'column',
  height: 'calc(100dvh - 14rem)',
  gap: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title5_b_15,
  color: themeVars.color.gray400,
});

export const description = style({
  marginTop: '0.4rem',
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.gray400,
  textAlign: 'center',
});

export const button = style({
  position: 'sticky',
  bottom: '0',
  padding: '2rem',
  height: '9rem',
  width: '100%',

  backgroundColor: themeVars.color.white,
});
