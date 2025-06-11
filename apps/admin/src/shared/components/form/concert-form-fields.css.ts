import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const formContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
});

export const fieldSection = style({
  ...themeVars.display.flexColumn,
  gap: '1.5rem',
  padding: '2rem',
  marginBottom: '2rem',
  border: `1px solid ${themeVars.color.gray200}`,
  backgroundColor: themeVars.color.white,
  borderRadius: '16px',
  boxShadow:
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  position: 'relative',
  overflow: 'hidden',

  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    backgroundColor: '#4F46E5',
    borderRadius: '16px 16px 0 0',
  },
});

export const title = style({
  fontSize: themeVars.fontSize.title2,
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray900,
  marginBottom: '0.5rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',

  '::before': {
    content: '""',
    width: '8px',
    height: '8px',
    backgroundColor: '#4F46E5',
    borderRadius: '50%',
    flexShrink: 0,
  },
});

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  marginBottom: '0.5rem',

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
});

export const singleInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const posterPreviewContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.5rem',
  backgroundColor: themeVars.color.gray100,
  borderRadius: '12px',
  border: `2px dashed ${themeVars.color.gray300}`,
  marginTop: '1rem',
});

export const posterPreview = style({
  maxWidth: '100%',
  maxHeight: '24rem',
  objectFit: 'contain',
  borderRadius: '8px',
});

export const buttonContainer = style({
  display: 'flex',
  gap: '1rem',
  marginTop: '1.5rem',

  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
    },
  },
});

export const addButton = style({
  padding: '0.875rem 1.5rem',
  fontSize: themeVars.fontSize.body3,
  fontWeight: themeVars.fontWeight.medium,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: '#4F46E5',
  color: 'white',
  cursor: 'pointer',
  alignSelf: 'flex-start',
  position: 'relative',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',

  ':hover': {
    backgroundColor: '#6366F1',
    transition: 'background-color 0.3s ease',
  },
});

export const deleteButton = style({
  padding: '0.5rem 1.25rem',
  fontSize: themeVars.fontSize.body4,
  fontWeight: themeVars.fontWeight.medium,
  borderRadius: '6px',
  border: 'none',
  backgroundColor: themeVars.color.confeti_red,
  color: themeVars.color.white,
  cursor: 'pointer',

  ':hover': {
    backgroundColor: '#F56565',
    transition: 'background-color 0.3s ease',
  },
});

export const fieldGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: themeVars.color.gray100,
  borderRadius: '12px',
  border: `1px solid ${themeVars.color.gray200}`,
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
});

export const fieldGroupHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
});

export const fieldGroupTitle = style({
  fontSize: themeVars.fontSize.body2,
  fontWeight: themeVars.fontWeight.semibold,
  color: themeVars.color.gray700,
});
