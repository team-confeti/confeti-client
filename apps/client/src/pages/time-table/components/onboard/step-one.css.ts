import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const timeTableOnboardContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  height: '100%',
  padding: '3rem 2rem',
  gap: '0.8rem',
  flexShrink: 0,
});

export const timeTableImageContainer = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  textAlign: 'center',
  gap: '2rem',
  alignSelf: 'stretch',
});

export const timeTableOnboardContent = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  alignItems: 'flex-start',
  gap: '1.9rem',
});
