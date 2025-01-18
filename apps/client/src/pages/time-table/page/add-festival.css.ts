import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  height: '100dvh',
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
  padding: '2rem',
  height: '9rem',
  backgroundColor: themeVars.color.white,
});
