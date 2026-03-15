import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2.4rem',
  background:
    'radial-gradient(circle at top, rgba(79, 70, 229, 0.12), transparent 32%), linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)',
});

export const card = style({
  width: '100%',
  maxWidth: '44rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  padding: '3.2rem',
  borderRadius: '2.4rem',
  backgroundColor: themeVars.color.white,
  boxShadow: '0 24px 80px rgba(15, 23, 42, 0.12)',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  alignItems: 'flex-start',
});

export const backButton = style({
  paddingInline: '0.8rem',
});

export const logo = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1.2rem',
  borderRadius: '1.6rem',
  backgroundColor: 'rgba(79, 70, 229, 0.08)',
});

export const title = style({
  margin: 0,
  fontSize: '3rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
});

export const description = style({
  margin: 0,
  fontSize: '1.6rem',
  lineHeight: 1.6,
  color: adminVars.slate600tw,
});

export const buttonGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const providerButton = style({
  width: '100%',
  minHeight: '5.6rem',
  justifyContent: 'space-between',
  borderRadius: '1.4rem',
  fontWeight: themeVars.fontWeight.semibold,
  paddingInline: '1.8rem',
});

export const providerIcon = style({
  width: '2.4rem',
  height: '2.4rem',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.bold,
});

export const kakaoButton = style({
  backgroundColor: '#FEE500',
  color: '#191600',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#F7D900',
    },
  },
});

export const kakaoIcon = style({
  backgroundColor: 'rgba(25, 22, 0, 0.12)',
  color: '#191600',
});

export const appleButton = style({
  backgroundColor: adminVars.gray900tw,
  color: themeVars.color.white,
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#000000',
    },
  },
});

export const appleIcon = style({
  backgroundColor: 'rgba(255, 255, 255, 0.16)',
  color: themeVars.color.white,
});

export const helperText = style({
  margin: 0,
  fontSize: '1.4rem',
  lineHeight: 1.5,
  color: adminVars.gray500tw,
  textAlign: 'center',
});
