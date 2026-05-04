import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'space-between',
  width: '100%',
  minHeight: '100dvh',
  alignItems: 'center',
  backgroundColor: themeVars.color.white,
  paddingTop: 'var(--safe-area-top)',
  paddingBottom: 'var(--safe-area-bottom)',
  boxSizing: 'border-box',
});

export const content = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  width: '100%',
  gap: '1.6rem',
});

export const header = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  gap: '1.2rem',
  boxSizing: 'border-box',
});

export const closeButtonSection = style({
  display: 'flex',
  padding: '1.2rem 2rem',
  alignItems: 'center',
  alignSelf: 'stretch',
  boxSizing: 'border-box',
});

export const closeButton = style({
  width: '2rem',
  height: '2rem',
  border: 'none',
  background: 'transparent',
  padding: '0',
  margin: '0',
  cursor: 'pointer',
  color: themeVars.color.black,
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.black,
  textAlign: 'center',
  whiteSpace: 'pre-line',
  margin: '0',
  lineHeight: '1.4',
});

export const heroSection = style({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  width: '100%',
  overflowX: 'auto',
  overflowY: 'hidden',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  WebkitOverflowScrolling: 'touch',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  touchAction: 'pan-x',
});

export const heroSectionItem = style({
  flex: '0 0 100%',
  minWidth: '100%',
  scrollSnapAlign: 'start',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
});

export const lottieBody = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
});

export const lottieAnimation = style({
  width: '100%',
  maxWidth: '32rem',
});

export const overlayImage = style({
  width: '100%',
  display: 'block',
  objectFit: 'contain',
});

export const indicatorSection = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0.2rem 0 0',
});

export const bottomSection = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  width: '100%',
  gap: '1.6rem',
  padding: '1.6rem 0 3rem 0',
  boxSizing: 'border-box',
});

export const loginButton = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  alignItems: 'center',
  gap: '1.2rem',
  margin: '0',
  boxSizing: 'border-box',
});

export const button = style({
  width: '100%',
  maxWidth: '33.5rem',
  gap: '0.4rem',
  height: '4.4rem',
});

export const description = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray400,
  textAlign: 'center',
  margin: '0',
  whiteSpace: 'pre-line',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const policyLine = style({
  margin: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.2rem',
  flexWrap: 'wrap',
});

export const atagText = style({
  textDecoration: 'underline',
});
