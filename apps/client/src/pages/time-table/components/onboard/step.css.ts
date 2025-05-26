import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const timeTableOnboardContainer = style({
  display: 'flex',
  width: '100%',
  height: '90vh',
  padding: '3rem 2rem',
  boxSizing: 'border-box',
});

export const timeTableOnboardContent = style({
  ...themeVars.display.flexColumn,
  flex: 1,
  width: '100%',
});

export const timeTableImageContainer = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  gap: '2rem',
  flex: 1,
});

export const timeTableOnboardButtonContainer = style({
  ...themeVars.display.flexJustifyAlignCenter,
  width: '100%',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const customAddButton = style({
  border: themeVars.border.lime3,
  backgroundColor: themeVars.color.white,
});
