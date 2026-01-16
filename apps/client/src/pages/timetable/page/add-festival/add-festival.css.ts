import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  flex: '1',
});

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',

  gap: '3rem 1.8rem',
  padding: '2.4rem 2rem',

  width: '100%',
  height: '100%',
  overflowY: 'auto',
});

export const buttonSection = style({
  background: themeVars.color.white_grad,
  position: 'fixed',
  padding: '2rem',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});
