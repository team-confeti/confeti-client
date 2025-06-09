// styles/concert-form.css.ts
import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const title = style({
  fontSize: themeVars.fontSize.title1,
  fontWeight: themeVars.fontWeight.bold,
});

export const section = style({
  padding: '2rem 0',
  borderRadius: '1rem',
});
