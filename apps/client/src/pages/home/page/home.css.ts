import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const background = style({
  background: themeVars.color.confeti_lime_grad,
});

export const performanceBannerContainer = style({
  width: '100%',
  paddingTop: '0.1rem',
  background: themeVars.color.confeti_lime_grad,
});

export const ticketingBannerContainer = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  padding: '2.4rem 2rem',
  gap: '1.6rem',
  borderRadius: '2rem 2rem 0 0',
  boxShadow: themeVars.shadowStyles.shadow_md_3.boxShadow,
  background: themeVars.color.white,
});

export const ticketingBannerText = style({
  ...themeVars.fontStyles.subtitle1_m_18,
  color: themeVars.color.gray800,
  lineHeight: '1.3',
});

export const highlightedText = style({
  ...themeVars.fontStyles.name_b_18,
  textDecorationStyle: 'wavy',
  textDecorationColor: themeVars.color.confeti_lime,
  textDecorationSkipInk: 'none',
  textDecorationLine: 'underline',
  textDecorationThickness: 1.89,
  lineHeight: '1.4',
});
