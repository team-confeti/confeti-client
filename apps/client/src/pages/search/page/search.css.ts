import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const resultSection = style({
  ...themeVars.display.flexColumn,
});

export const countSection = style({
  padding: '1rem 2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: themeVars.border.gray200,
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
