import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: 'calc(100dvh - 5rem)',
  padding: '2rem 2rem 0 2rem',
});

export const title = style({
  marginBottom: '2rem',

  ...themeVars.fontStyles.body5_m_12,
});

export const performanceContainer = style({
  flex: 1,
  overflowY: 'auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridColumnGap: '1.8rem',
  gridRowGap: '3rem',
});

export const buttonSection = style({
  position: 'fixed',
  padding: '2rem',
  bottom: 0,
  left: '50%',
  width: 'min(100%, var(--max-width))',
  transform: 'translateX(-50%)',
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',
});
