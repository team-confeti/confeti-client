import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

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
