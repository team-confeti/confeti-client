import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: 'calc(100dvh - 5rem)',
});

export const container = style({
  flex: 1,
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '2.4rem 2rem',
  gridColumnGap: '1.8rem',
  gridRowGap: '3rem',
});

export const buttonSection = style({
  position: 'relative',
  bottom: '0',
  left: '0',
  padding: '2rem',
  height: '9rem',
  width: '100%',
  backgroundColor: themeVars.color.white,
});
