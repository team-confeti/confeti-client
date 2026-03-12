import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2rem',
  textAlign: 'center',
});

export const icon = style({
  color: '#9CA3AF',
  marginBottom: '1.6rem',
});

export const title = style({
  fontSize: '1.6rem',
  fontWeight: 500,
  color: '#6B7280',
  marginBottom: '0.8rem',
});

export const description = style({
  fontSize: '1.4rem',
  color: '#9CA3AF',
  marginBottom: '2rem',
});

export const action = style({
  marginTop: '1.6rem',
});
