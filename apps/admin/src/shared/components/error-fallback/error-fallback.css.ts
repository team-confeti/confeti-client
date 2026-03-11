import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.6rem',
  padding: '4rem 2rem',
  minHeight: '30rem',
  textAlign: 'center',
});

export const icon = style({
  width: '4.8rem',
  height: '4.8rem',
  color: '#EF4444',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: 600,
  color: '#111827',
  margin: 0,
});

export const message = style({
  fontSize: '1.4rem',
  color: '#6B7280',
  margin: 0,
  maxWidth: '40rem',
});

export const retryButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1rem 2rem',
  backgroundColor: '#6366F1',
  color: '#FFFFFF',
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: 500,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: '#4F46E5',
    },
  },
});
