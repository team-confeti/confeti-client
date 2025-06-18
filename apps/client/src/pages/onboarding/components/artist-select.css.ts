import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

const fadeInScale = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.5)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

export const onboardingContentSection = style({
  height: `calc(100dvh - ${themeVars.size.height.header})`,
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
  paddingBottom: '3rem',
});

export const avatar = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '1.2rem',
  animation: `${fadeInScale} 0.8s cubic-bezier(0, 0.71, 0.2, 1.01) 0.5s both`,
});

export const artistName = style({
  ...themeVars.fontStyles.body2_m_15,
  color: themeVars.color.black,
  textAlign: 'center',
  width: '100%',
  maxWidth: '9rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
