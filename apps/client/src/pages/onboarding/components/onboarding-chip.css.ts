import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const onboardingCountChipContainer = style({
  display: 'inline-flex',
  padding: '0.6rem 1.4rem',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
  borderRadius: '5rem',
  backgroundColor: themeVars.color.gray900,
  backdropFilter: 'blur(2px)',
  cursor: 'pointer',
});

export const onboardingCountChip = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.confeti_lime,
});
