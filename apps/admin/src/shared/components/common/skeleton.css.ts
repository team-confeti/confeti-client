import { keyframes, style } from '@vanilla-extract/css';

import { adminVars } from '@shared/styles/admin-tokens.css';

const shimmerKeyframes = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const shimmer = style({
  background: `linear-gradient(90deg, ${adminVars.lightGray} 25%, ${adminVars.neutral50} 50%, ${adminVars.lightGray} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmerKeyframes} 1.5s infinite ease-in-out`,
  borderRadius: '0.4rem',
});

export const tableWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  padding: '1.6rem',
});

export const tableRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--cols, 4), 1fr)',
  gap: '1.2rem',
});

export const tableCell = style({
  height: '2rem',
  borderRadius: '0.4rem',
});

export const cardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const cardImage = style({
  width: '100%',
  height: '18rem',
  borderRadius: '0.8rem',
});

export const cardLine = style({
  height: '1.6rem',
  borderRadius: '0.4rem',
});

export const dashboardWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  padding: '2.4rem',
});

export const dashboardCards = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
});

export const dashboardCard = style({
  height: '17.4rem',
  borderRadius: '1.4rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const textLine = style({
  height: '1.6rem',
  borderRadius: '0.4rem',
});
