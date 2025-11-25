import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  height: '100vh',
  overflow: 'hidden',
});

export const navigationWrapper = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  backgroundColor: themeVars.color.white,
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 48px)',
  marginTop: '48px',
  padding: '0 2rem',
});

export const image = style({
  width: '52.27%',
  aspectRatio: '1 / 1',
});

export const title = style({
  ...themeVars.fontStyles.subtitle3_b_15,
  color: themeVars.color.gray500,
  marginBottom: '1rem',
});

export const description = style({
  textAlign: 'center',
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray400,
  lineHeight: '19.6px',
});
