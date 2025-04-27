import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: 'calc(100dvh - 1rem)',
  padding: '2rem 2rem 0 2rem',
  overflowY: 'auto',
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
  paddingBottom: '10rem',
});

export const buttonSection = style({
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  height: '9rem',
  padding: '0 2rem',

  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)',

  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
