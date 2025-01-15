import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  backgroundColor: themeVars.color.white,
});

export const resultSection = style({
  width: '100%',
});

export const section = style({
  padding: '1.6rem 0',
});

export const countSection = style({
  padding: '1rem 2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: themeVars.border.gray200,
});

export const emptyPerformanceSection = style({
  ...themeVars.fontStyles.body3_m_14,
  height: '23rem', // 높이 고정
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  color: themeVars.color.gray500,
  textAlign: 'center',
  border: '1px solid red',
});
