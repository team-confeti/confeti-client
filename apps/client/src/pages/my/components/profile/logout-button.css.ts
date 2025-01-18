import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  alignItems: 'center',

  padding: '0.7rem 1.25rem',
  borderRadius: '2rem',
  border: themeVars.border.lime3,
  gap: '0.2rem',
  color: themeVars.color.confeti_lime3,
  ...themeVars.fontStyles.subtitle5_sb_12,
});
