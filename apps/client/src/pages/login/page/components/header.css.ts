import { style } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';
export const header = style({
  width: '100%',
  height: '4.4rem',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12.7rem',
  padding: '1.2rem 16.7rem 1.2rem 2.0rem',
  borderBottom: `0.1rem solid ${themeVars.color.gray200}`,
  background: themeVars.color.white,
});

export const headerText = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
});
