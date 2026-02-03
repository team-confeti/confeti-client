import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const ticketOpeningContainer = recipe({
  base: {
    ...themeVars.display.flexColumn,
    padding: '4rem 0 3rem 0',
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

export const ticketOpeningScrollContainer = style({
  display: 'flex',
  margin: '1rem 0 3rem 0',
  width: '100%',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
});

export const ticketOpeningSection = style({
  flex: '0 0 100%',
  scrollSnapAlign: 'start',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 2rem',
});

export const ticketOpeningCardContainer = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  gap: '1rem',
  overflowX: 'auto',
});

export const ticketOpeningCardWrapper = style({
  maxWidth: '390px',
  width: '100%',
});

export const ticketOpeningBannerContainer = style({
  ...themeVars.display.flexBetween,
  alignItems: 'start',
  margin: '0 2rem',
  height: '3.4rem',
});

export const ticketOpeningBannerText = style({
  paddingLeft: '0.6rem 1rem',
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.white,
});

export const ticketOpeningTooltip = style({
  padding: '0.6rem 1rem',
});
