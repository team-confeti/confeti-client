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
  ...themeVars.display.flexBetween,
  margin: '0 2rem',
});

export const ticketingBannerText = style({
  paddingLeft: '0.6rem 1rem',
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.white,
});

export const ticketingBubble = style({
  background: themeVars.color.confeti_lime,
  padding: '0.8rem 1.4rem',
  borderRadius: '8px',
  ...themeVars.fontStyles.body4_m_13,
  position: 'relative',
  '::after': {
    content: '""',
    position: 'absolute',
    bottom: '-7px',
    right: '20px',
    width: '6px',
    height: '7.5px',
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='7' viewBox='0 0 6 7' fill='none'%3E%3Cpath d='M6 0.39209C5.086 4.52372 2.28674 6.39209 0 6.39209C0 6.39209 0.318511 5.53491 0.318511 3.25974C0.318511 0.984574 0.00321917 0.39209 0.00321917 0.39209H6Z' fill='%23B5F602'/%3E%3C/svg%3E")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
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
