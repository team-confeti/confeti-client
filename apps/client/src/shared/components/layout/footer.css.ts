import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'grid',
  gridTemplateRows: '1fr 1fr',
  height: '13.5rem',
  padding: '2rem',

  backgroundColor: themeVars.color.gray200,
});

export const logoSection = style({});

export const textSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'end',
  width: '100%',

  color: themeVars.color.gray500,
});

export const left = style([
  themeVars.fontStyles.body6_m_11,
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
]);

export const right = style([
  themeVars.fontStyles.caption_b_10,
  {
    display: 'flex',
    gap: '1.2rem',
    marginBottom: '0.2rem',
  },
]);
