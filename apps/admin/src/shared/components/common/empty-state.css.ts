import { style } from '@vanilla-extract/css';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  textAlign: 'center',
});

export const icon = style({
  color: adminVars.gray400tw,
  marginBottom: '1.6rem',
});

export const title = style({
  fontSize: '1.6rem',
  fontWeight: 500,
  color: adminVars.gray500tw,
  marginBottom: '0.8rem',
});

export const description = style({
  fontSize: '1.4rem',
  color: adminVars.gray400tw,
  marginBottom: '2rem',
});

export const action = style({
  marginTop: '1.6rem',
});
