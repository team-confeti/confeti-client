import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: themeVars.color.white,
  borderRadius: '1.2rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  maxWidth: '50rem',
  width: '90%',
  maxHeight: '90vh',
  overflow: 'auto',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2rem',
  borderBottom: `1px solid ${adminVars.gray200tw}`,
});

export const title = style({
  fontSize: '1.8rem',
  fontWeight: 600,
  color: adminVars.gray900tw,
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: adminVars.gray500tw,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.4rem',
  borderRadius: '0.4rem',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: adminVars.gray100tw,
  },
});

export const content = style({
  padding: '2rem',
});

export const footer = style({
  display: 'flex',
  gap: '1.2rem',
  justifyContent: 'flex-end',
  padding: '2rem',
  borderTop: `1px solid ${adminVars.gray200tw}`,
});
