import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const fieldSection = style({
  ...themeVars.display.flexColumn,
  gap: '1rem',
  padding: '2rem',
  marginBottom: '2rem',
  border: `1px solid ${themeVars.color.gray300}`,
  backgroundColor: themeVars.color.gray100,
  boxShadow: `0 0 0 2px ${themeVars.color.gray100}`,
  borderRadius: '8px',
});

export const title = style({
  fontSize: themeVars.fontSize.title2,
  fontWeight: themeVars.fontWeight.bold,
  marginBottom: '1rem',
});

export const formWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2rem',
});

export const inputContainer = style({
  display: 'flex',
  gap: '2rem',
  marginBottom: '1rem',
});

export const posterPreviewContainer = style({
  display: 'flex',
  justifyContent: 'flex-start',
});

export const posterPreview = style({
  marginTop: '0.5rem',
  maxWidth: '100%',
  maxHeight: '20rem',
  objectFit: 'contain',
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
});

export const addButton = style({
  padding: '1rem 2rem',
  fontSize: themeVars.fontSize.body2,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4F46E5',
  color: themeVars.color.white,
  cursor: 'pointer',
  alignSelf: 'flex-start',
});

export const deleteButton = style({
  padding: '0.5rem 1.5rem',
  fontSize: themeVars.fontSize.body2,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: themeVars.color.confeti_red,
  color: themeVars.color.white,
  alignSelf: 'flex-end',
});
