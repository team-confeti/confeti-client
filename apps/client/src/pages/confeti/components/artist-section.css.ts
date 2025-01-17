import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

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
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.black,
  backgroundColor: themeVars.color.gray100,
  padding: '0.4rem 1.2rem',
  borderRadius: '1.3rem',
  // 토큰화 해야할지 고민
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  marginBottom: '1.2rem',
});

export const artistSection = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const expandedSection = style({
  ...themeVars.display.flexColumn,
});

export const expandedArtists = style({
  backgroundColor: themeVars.color.gray100,
  padding: '2rem',
});
