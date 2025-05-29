import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const button = style({
  padding: '0.7rem 1.6rem',
  margin: '1.2rem 0 4rem 0',
  border: '1px solid',
  borderColor: themeVars.color.gray300,
  backgroundColor: themeVars.color.white,
  borderRadius: 5,
  gap: '0rem',
});
