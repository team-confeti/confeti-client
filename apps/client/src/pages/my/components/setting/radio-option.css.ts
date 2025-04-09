import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  gap: '1rem',
  textAlign: 'center',
  ...themeVars.fontStyles.body2_r_15,
});

export const radioStyle = style({
  appearance: 'none',
  width: '2rem',
  height: '2rem',
  border: `1.5px solid ${themeVars.color.gray400}`,
  borderRadius: '10px',
  transition: 'all 0.3s ease',

  selectors: {
    '&:checked': {
      border: `5px solid ${themeVars.color.confeti_lime}`,
      borderRadius: '1rem',
    },

    '&:disabled': {
      border: '1px solid',
      color: themeVars.color.gray400,
    },
  },
});
