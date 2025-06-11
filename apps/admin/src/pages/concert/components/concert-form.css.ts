import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const formWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2rem',
});

export const submitButton = style({
  padding: '1rem 2rem',
  fontSize: themeVars.fontSize.body2,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4F46E5',
  color: themeVars.color.white,
  cursor: 'pointer',
  alignSelf: 'flex-end',
  ':disabled': {
    backgroundColor: themeVars.color.gray300,
    cursor: 'not-allowed',
  },
  ':hover': {
    backgroundColor: '#6366F1',
    transition: 'background-color 0.3s ease',
  },
});
