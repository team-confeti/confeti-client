import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  fontWeight: 500,
  border: 'none',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  selectors: {
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});

export const primary = style({
  backgroundColor: '#3B82F6',
  color: '#FFFFFF',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#2563EB',
    },
  },
});

export const secondary = style({
  backgroundColor: '#F3F4F6',
  color: '#1F2937',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#E5E7EB',
    },
  },
});

export const danger = style({
  backgroundColor: '#EF4444',
  color: '#FFFFFF',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#DC2626',
    },
  },
});

export const ghost = style({
  backgroundColor: 'transparent',
  color: '#6B7280',
  selectors: {
    '&:hover:not(:disabled)': {
      backgroundColor: '#F3F4F6',
    },
  },
});

export const small = style({
  padding: '0.6rem 1.2rem',
  fontSize: '1.3rem',
});

export const medium = style({
  padding: '0.8rem 1.6rem',
  fontSize: '1.4rem',
});

export const large = style({
  padding: '1.2rem 2rem',
  fontSize: '1.6rem',
});

export const iconLeft = style({
  display: 'flex',
  alignItems: 'center',
});

export const iconRight = style({
  display: 'flex',
  alignItems: 'center',
});
