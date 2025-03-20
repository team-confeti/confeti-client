import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const artistSection = style({
  width: '100%',
});

export const daySection = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white,
});

export const dayGroups = style({
  ...themeVars.display.flexColumn,
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
  marginBottom: '1.2rem',
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.black,
  backgroundColor: themeVars.color.gray100,
  padding: '0.4rem 1.2rem',
  borderRadius: '1.3rem',
});
