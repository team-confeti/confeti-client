import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const ticketingCardContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  gap: '1rem',
  overflowX: 'auto',
});

export const ticketingCardWrapper = style({
  flex: '0 0 min(390px, calc(100vw - 4rem))',
  minWidth: 0,
});

export const ticketingBannerContainer = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  padding: '0 2rem 0 2rem',
  gap: '1.6rem',
});

export const ticketingBannerText = style({
  ...themeVars.fontStyles.title2_b_20,
});
