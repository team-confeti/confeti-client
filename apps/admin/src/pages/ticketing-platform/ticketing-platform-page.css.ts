import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const title = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#101828',
  lineHeight: '2.8rem',
  letterSpacing: '-0.4492px',
  marginBottom: '0.4rem',
});

export const subtitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#6a7282',
  lineHeight: '2rem',
  letterSpacing: '-0.1504px',
});

export const createButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  backgroundColor: '#0f172b',
  color: themeVars.color.white,
  padding: '0 1.6rem',
  height: '3.6rem',
  borderRadius: '1rem',
  border: 'none',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.1504px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: themeVars.color.slate700,
  },
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '6.4rem 3.2rem',
  color: themeVars.color.gray400,
  backgroundColor: themeVars.color.gray50,
  borderRadius: '1.6rem',
  border: `1px solid ${themeVars.color.gray200}`,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.regular,
  lineHeight: '2.4rem',
});

export const emptyIcon = style({
  marginBottom: '1.6rem',
  opacity: 0.3,
  color: themeVars.color.gray400,
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1.6rem',
  alignItems: 'start',
});

export const card = style({
  backgroundColor: themeVars.color.white,
  borderRadius: '1.4rem',
  border: `1px solid #e5e7eb`,
  padding: '0.1rem 1.7rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  height: '9rem',
  alignSelf: 'start',

  ':hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    borderColor: themeVars.color.slate900,
  },
});

export const cardLogo = style({
  width: '5.6rem',
  height: '5.6rem',
  borderRadius: '1rem',
  backgroundColor: '#f9fafb',
  border: `1px solid #f3f4f6`,
  color: themeVars.color.gray400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  flexShrink: 0,
});

export const cardLogoImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const cardTitle = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#101828',
  lineHeight: '2.4rem',
  letterSpacing: '-0.3125px',
  flex: 1,
});

// Form card styles
export const formCard = style({
  backgroundColor: '#f8fafc',
  borderRadius: '1.4rem',
  border: `2px solid #0f172b`,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  padding: '1.8rem',
  alignSelf: 'start',
});

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '2.4rem',
});

export const modalTitle = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#0f172b',
  lineHeight: '2.4rem',
  letterSpacing: '-0.3125px',
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  color: '#0f172b',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  flexShrink: 0,

  ':hover': {
    opacity: 0.7,
  },
});

export const modalContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,
});

export const formRow = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.2rem',
});

export const fileInput = style({
  display: 'none',
});

export const logoUploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  width: '6.4rem',
  height: '6.4rem',
  backgroundColor: themeVars.color.white,
  border: `2px solid #d1d5dc`,
  borderRadius: '1rem',
  color: '#99a1af',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  overflow: 'hidden',
  flexShrink: 0,

  ':hover': {
    borderColor: '#0f172b',
  },
});

export const logoPreview = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const uploadIcon = style({
  width: '1.6rem',
  height: '1.6rem',
  color: 'inherit',
});

export const uploadText = style({
  fontSize: '1rem',
  fontWeight: themeVars.fontWeight.regular,
  color: 'inherit',
  textAlign: 'center',
  lineHeight: '1.5rem',
  letterSpacing: '0.1172px',
});

export const input = style({
  flex: 1,
  padding: '0.8rem 1.2rem',
  height: '3.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#0f172b',
  backgroundColor: themeVars.color.white,
  border: `1px solid #d1d5dc`,
  borderRadius: '1rem',
  lineHeight: 'normal',
  letterSpacing: '-0.1504px',
  transition: 'all 0.2s ease',

  ':focus': {
    outline: 'none',
    borderColor: '#0f172b',
  },

  '::placeholder': {
    color: 'rgba(15, 23, 43, 0.5)',
  },
});

export const submitButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '3.6rem',
  backgroundColor: '#0f172b',
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.1504px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.slate700,
  },

  ':disabled': {
    backgroundColor: themeVars.color.gray300,
    color: themeVars.color.gray500,
    cursor: 'not-allowed',
  },
});
