import { style } from '@vanilla-extract/css';

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
  backgroundColor: '#DBEAFE',
  color: '#1E40AF',
});

export const success = style({
  backgroundColor: '#D1FAE5',
  color: '#065F46',
});

export const warning = style({
  backgroundColor: '#FEF3C7',
  color: '#92400E',
});

export const danger = style({
  backgroundColor: '#FEE2E2',
  color: '#991B1B',
});

export const neutral = style({
  backgroundColor: '#F3F4F6',
  color: '#4B5563',
});
