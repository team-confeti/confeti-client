import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnCenter,
  justifyContent: 'center',
  position: 'fixed',
  width: '100vw',
  height: 'calc(100vh - 13.5rem - 10.5rem)',
  left: 0,
  color: themeVars.color.gray600,
});

export const icon = style({
  width: '8rem',
  height: '8rem',
  marginBottom: '3rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.gray800,
  marginBottom: '0.8rem',
});

export const subtitle = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
});
