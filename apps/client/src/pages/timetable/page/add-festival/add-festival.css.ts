import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  flex: '1',
});

export const container = style({
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'wrap',
  overflowY: 'auto',
  padding: '2.4rem 2rem',
  rowGap: '3rem',
  columnGap: '1.8rem',
  maxWidth: 'fit-content',
  maxHeight: 'fit-content',
});

export const festivalCardWrapper = style({
  width: 'calc((100% - 8rem ) / 3)',
  flexShrink: 0,
  flexGrow: 0,
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
