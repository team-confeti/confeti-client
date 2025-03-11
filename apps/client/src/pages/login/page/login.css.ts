import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  marginTop: '6.4rem',
  gap: '11.8rem',
  padding: '0 2.5rem',
});

export const loginButtonSection = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  gap: '1.2rem',
});

export const Logo = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: '100%',
});

export const description = style({
  ...themeVars.fontStyles.body6_m_11,
  color: themeVars.color.gray400,
  textAlign: 'center',
  marginTop: '2.8rem',
});

export const atagText = style({
  textDecoration: 'underline',
});
