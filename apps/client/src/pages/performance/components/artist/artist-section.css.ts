import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const artistSection = style({
  width: '100%',
});

export const artistGroup = style({
  padding: '1.7rem 2rem 5.6rem 2rem',
});

export const daySection = style({
  padding: '1.6rem 2rem 2rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const dayGroups = style({
  ...themeVars.display.flexColumn,
  paddingBottom: '5.2rem',
});

export const dayGroup = style({
  ...themeVars.display.flexColumn,
  backgroundColor: themeVars.color.white,
});

export const dayTitle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  marginBottom: '1.6rem',
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.black,
  backgroundColor: themeVars.color.gray200,
  padding: '0.4rem 0.8rem',
  borderRadius: '1.3rem',
});
