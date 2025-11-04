import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  ...themeVars.fontStyles.body3_m_14,
  padding: '2.4rem 2rem 1.4rem 2rem',
  gap: '1.5rem',
});

export const sort = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
});

export const leftContent = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.5rem',
});

export const rightContent = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.8rem',
});

export const buttons = style({
  ...themeVars.display.flexAlignCenter,
  ...themeVars.fontStyles.body3_m_14,
  gap: '2.6rem',
  maxHeight: '1.5rem',
});

export const cancelButton = style({
  color: themeVars.color.gray800,
});

export const deleteButton = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray400,
});

export const deleteButtonActive = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.confeti_lime3,
});

export const editButton = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.2rem',
  color: themeVars.color.black,
});
