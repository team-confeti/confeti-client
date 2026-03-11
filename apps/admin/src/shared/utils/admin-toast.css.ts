import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const adminToastBase = style({
  padding: '1.4rem 2rem',
  borderRadius: '1.2rem',
  width: 'auto',
  minWidth: '28rem',
  maxWidth: '44rem',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
  ...themeVars.fontStyles.body1_m_16,
  textAlign: 'left',
  justifyContent: 'flex-start',
  gap: '1.2rem',
});

export const successAccent = style({
  borderLeft: `4px solid ${themeVars.color.emerald500}`,
});

export const errorAccent = style({
  borderLeft: `4px solid ${themeVars.color.red500}`,
});
