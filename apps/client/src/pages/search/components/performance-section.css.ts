import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  padding: '1.6rem 0',
});

export const emptyPerformanceSection = style({
  ...themeVars.fontStyles.body3_m_14,
  height: '23rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  color: themeVars.color.gray500,
  textAlign: 'center',
});
