import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const ticketingCardContainer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  gap: '1rem',
  overflowX: 'auto',
});

export const ticketingBannerContainer = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  padding: '0 2rem',
  gap: '1.6rem',
});
