import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({});

export const title = style({
  padding: '1rem 0',
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
});

export const inputWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '1rem 1.2rem',
  borderRadius: '5px',
  border: `1px solid ${themeVars.color.gray300}`,
});

export const inputWrapperError = style({
  border: `1px solid ${themeVars.color.confeti_red}`,
});

export const textSection = style({
  flexGrow: 1,
  backgroundColor: themeVars.color.white,
  ...themeVars.fontStyles.body2_m_15,
  color: themeVars.color.black,

  selectors: {
    '&::placeholder': {
      ...themeVars.fontStyles.body2_m_15,
      color: themeVars.color.gray500,
    },
    '&:focus': {
      outline: 'none',
    },
  },
});

export const textSectionInvalid = style({
  color: themeVars.color.gray500,
});

export const closeBtn = style({
  cursor: 'pointer',
});
