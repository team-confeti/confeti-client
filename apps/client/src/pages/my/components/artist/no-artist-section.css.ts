import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...themeVars.display.flexCenter,
  flexDirection: 'column',
});

export const title = style({
  ...themeVars.fontStyles.body3_m_14,
  margin: '2rem',
  color: themeVars.color.gray500,
  whiteSpace: 'pre-line',
  lineHeight: '100%',
  fontWeight: '500',
});

export const button = style({
  width: '18rem',
});
