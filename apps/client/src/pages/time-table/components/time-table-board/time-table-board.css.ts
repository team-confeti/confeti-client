import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '4.2rem 2rem 2rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const wrapper = style({
  width: '100%',
  position: 'relative',
});
export const timeList = style({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '3rem',
});
export const minutesP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 0.4rem',
  marginRight: '0.7rem',
  color: themeVars.color.gray400,
});
export const timeP = style({
  ...themeVars.fontStyles.body5_r_12,
  padding: '0 0.4rem',
  marginRight: '0.7rem',
  color: themeVars.color.gray600,
});
export const timeBar = style({
  height: '0.1rem',
  width: '100%',
  color: themeVars.color.gray300,
});

export const saveButton = style({
  borderRadius: '5px',
});

export const saveButtonWrapper = style({
  paddingTop: '3.2rem',
});
