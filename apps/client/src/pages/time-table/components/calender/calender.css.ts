import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const yearSection = style({
  ...themeVars.fontStyles.title5_b_15,
  color: themeVars.color.black,
});

export const dateSection = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7,1fr)',
  padding: '1rem 0rem',
  gap: '2rem',
});

export const dateItems = style({
  ...themeVars.display.flexColumnCenter,
  width: '3rem',
  height: '5.5rem',
  gap: '0.6rem',
});

export const dayNum = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
});

export const dayKo = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
});
