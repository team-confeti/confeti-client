import { style } from '@vanilla-extract/css';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.4rem 1rem',
  fontSize: '1.2rem',
  fontWeight: 500,
  borderRadius: '0.6rem',
  whiteSpace: 'nowrap',
});

export const primary = style({
  backgroundColor: adminVars.blue100,
  color: adminVars.blue800,
});

export const success = style({
  backgroundColor: adminVars.green100,
  color: adminVars.green800,
});

export const warning = style({
  backgroundColor: adminVars.amber100,
  color: adminVars.amber800,
});

export const danger = style({
  backgroundColor: adminVars.red100,
  color: adminVars.red800,
});

export const neutral = style({
  backgroundColor: adminVars.gray100tw,
  color: adminVars.gray600tw,
});
