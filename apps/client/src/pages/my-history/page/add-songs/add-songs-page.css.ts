import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  height: 'calc(100dvh - 5rem)',
  display: 'flex',
  flexDirection: 'column',
});

export const searchBarContainer = style({
  padding: '0.8rem 2rem 0.8rem 2rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});

export const renderContentContainer = style({
  flex: 1,
  overflowY: 'auto',
  padding: '0 2rem',
});

export const buttonContainer = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white_grad,
});

export const musicListContainer = style({
  padding: '1rem 2rem 1rem 2rem',
  cursor: 'pointer',
});

export const listContainer = style({
  marginBottom: '1rem',
});
export const selectedComment = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray600,
  padding: '0.8rem 2rem',
  marginBottom: '0.4rem',
});

export const relatedArtistContainer = style({
  display: 'flex',
  padding: '0 2rem',
  alignItems: 'center',
});

export const relatedArtistImg = style({
  width: '3rem',
  height: '3rem',
  borderRadius: '30px',
  marginRight: '1.5rem',
});

export const relatedArtistName = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
  marginRight: '1rem',
});

export const artistText = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray500,
});
