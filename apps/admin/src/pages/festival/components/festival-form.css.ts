import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const tabWrapper = style({
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
  borderBottom: `1px solid ${themeVars.color.gray300}`,
});

export const tab = style({
  padding: '1rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: themeVars.fontSize.body1,
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.gray600,
  position: 'relative',
  transition: 'color 0.2s ease',

  ':hover': {
    color: themeVars.color.gray900,
  },
});

export const activeTab = style([
  tab,
  {
    color: '#4F46E5',
    fontWeight: themeVars.fontWeight.semibold,

    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: '#4F46E5',
    },
    ':hover': {
      color: '#4F46E5',
    },
  },
]);

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

export const subTitle = style({
  fontSize: themeVars.fontSize.title3,
  fontWeight: themeVars.fontWeight.semibold,
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

export const artistInputContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '2rem',
  marginBottom: '1rem',
});

export const imageInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '0.5rem',
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
  padding: '1rem 1.5rem',
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
