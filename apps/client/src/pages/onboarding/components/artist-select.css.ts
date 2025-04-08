import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const onboardingContentSection = style({
  height: '100vh',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
});

export const searchBarSection = style({
  marginTop: '3rem',
  marginBottom: '2.4rem',
});

export const avatarGridSection = style({
  flex: 1,
  overflowY: 'scroll',
  overflowX: 'hidden',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  rowGap: '2.6rem',
  columnGap: '4.7rem',
  alignItems: 'center',
  justifyItems: 'center',
});

export const avatar = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '1.2rem',
});

export const artistName = style({
  ...themeVars.fontStyles.body2_m_15,
  color: themeVars.color.black,
});
