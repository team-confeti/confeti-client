import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const ticketingCardContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  gap: '1rem',
  overflowX: 'auto',
});

export const ticketingCardWrapper = style({
  maxWidth: '390px',
  width: '100%',
});

export const ticketingContainer = recipe({
  base: {
    ...themeVars.display.flexColumn,
    padding: '4rem 0 3rem 0',
    gap: '3rem',
  },
  variants: {
    colorVariant: {
      0: { background: themeVars.color.purple_grad },
      1: { background: themeVars.color.pink_grad },
      2: { background: themeVars.color.green_grad },
      3: { background: themeVars.color.blue_grad },
      4: { background: themeVars.color.orange_grad },
    },
  },
});

export const ticketingBannerContainer = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  gap: '1.6rem',
});

export const ticketingScrollContainer = style({
  display: 'flex',
  width: '100%',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
});

export const ticketingSection = style({
  flex: '0 0 100%',
  scrollSnapAlign: 'start',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 2rem',
});

export const ticketingBannerText = style({
  marginLeft: '2rem',
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.white,
});
