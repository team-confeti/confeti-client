import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const daySection = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  rowGap: '1.6rem',
  justifyContent: 'center',
});

export const artist = style({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.2rem',
});

export const artistImage = style({
  width: '7rem',
  height: '7rem',
  borderRadius: '3.5rem',
  overflow: 'hidden',
  backgroundColor: themeVars.color.gray100,
});

export const artistName = style({
  ...themeVars.fontStyles.body4_m_13,
  color: themeVars.color.gray800,
  width: '7rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'center',
});

export const dayGroups = style({
  display: 'flex',
  flexDirection: 'column',
});

export const dayGroup = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: themeVars.color.white,
});

export const dayTitle = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.black,
  backgroundColor: themeVars.color.gray100,
  padding: '0.4rem 1.2rem',
  borderRadius: '100px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-start',
  marginBottom: '1.2rem',
});

export const artistSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const expandedSection = style({
  display: 'flex',
  flexDirection: 'column',
});

export const expandedArtists = style({
  backgroundColor: themeVars.color.gray100,
  padding: '2rem',
});
