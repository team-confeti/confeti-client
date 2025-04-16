import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.8rem',
});

export const button = style({
  height: '4.4rem',
  marginTop: '1.6rem',
  border: '0.5px solid',
  borderColor: themeVars.color.gray400,
  backgroundColor: themeVars.color.white,
  borderRadius: '0.8rem',
});

export const description = style({
  margin: '1.9rem 0 3rem 0',
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray400,
});
