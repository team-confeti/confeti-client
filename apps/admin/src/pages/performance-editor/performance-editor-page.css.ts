import { keyframes, style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

// Container
export const container = style({
  display: 'flex',
  flexDirection: 'column',
});

export const contentCard = style({
  backgroundColor: themeVars.color.white,
  borderRadius: '1.4rem',
  border: `1px solid ${themeVars.color.gray200}`,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
});

// Header
export const pageHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2.4rem',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
  gap: '2.4rem',
  flexShrink: 0,
});

export const closeButton = style({
  width: '3.6rem',
  height: '3.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '1rem',
  cursor: 'pointer',
  color: themeVars.color.gray600,
  transition: 'all 0.2s ease',
  flexShrink: 0,

  ':hover': {
    backgroundColor: themeVars.color.gray100,
  },
});

export const backButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  height: '3.6rem',
  padding: '0 1.2rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  flexShrink: 0,

  ':hover': {
    backgroundColor: adminVars.gray100tw,
    color: themeVars.color.slate900,
  },
});

export const titleSection = style({
  flex: 1,
});

export const titleRow = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',
});
export const typeBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.gray500,
});

export const concertDot = style({
  width: '0.8rem',
  height: '0.8rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.emerald500,
});

export const festivalDot = style({
  width: '0.8rem',
  height: '0.8rem',
  borderRadius: '50%',
  backgroundColor: themeVars.color.purple500,
});
export const pageTitle = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
  marginBottom: '0.4rem',
});

export const pageSubtitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const headerActions = style({
  display: 'flex',
  gap: '1.2rem',
  flexShrink: 0,
});

export const deleteButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '3.6rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  color: themeVars.color.gray600,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const saveButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.6rem',
  height: '4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow:
    '0px 4px 6px -4px rgba(15, 23, 43, 0.2), 0px 10px 15px -3px rgba(15, 23, 43, 0.2)',
  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
  ':disabled': {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
});

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

export const buttonSpinner = style({
  animation: `${spin} 1s linear infinite`,
});

// Tabs
export const tabs = style({
  display: 'flex',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
  padding: '0 2.4rem',
  gap: '2.4rem',
  flexShrink: 0,
  backgroundColor: themeVars.color.gray50,
});

export const tab = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1.2rem 1.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid transparent',
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '2.2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  position: 'relative',
  marginBottom: '-1px',

  ':hover': {
    color: adminVars.gray900tw,
    backgroundColor: themeVars.color.gray100,
  },
});

export const tabActive = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '1.2rem 1.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: `2px solid ${themeVars.color.slate900}`,
  fontSize: '1.5rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
  lineHeight: '2.2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  position: 'relative',
  marginBottom: '-1px',
});

export const tabBadge = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '1.8rem',
  height: '1.8rem',
  padding: '0 0.6rem',
  backgroundColor: adminVars.gray200tw,
  color: adminVars.slate600tw,
  borderRadius: '9999px',
  fontSize: '1.1rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.4rem',
});

// Content
export const content = style({
  padding: '2.4rem',
});

// Modal
export const modalOverlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '2.4rem',
});

export const modal = style({
  backgroundColor: themeVars.color.white,
  borderRadius: '1.4rem',
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  width: '100%',
  maxWidth: '56rem',
  maxHeight: '90vh',
  overflowY: 'auto',
});

export const modalHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2.4rem',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
});

export const modalTitle = style({
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.8rem',
  letterSpacing: '-0.025em',
});

export const modalCloseButton = style({
  width: '3.2rem',
  height: '3.2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  cursor: 'pointer',
  color: adminVars.slate600tw,
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray100,
  },
});

export const modalContent = style({
  padding: '2.4rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const modalFooter = style({
  display: 'flex',
  gap: '1.2rem',
  justifyContent: 'flex-end',
  padding: '2.4rem',
  borderTop: `1px solid ${themeVars.color.gray200}`,
});

export const modalCancelButton = style({
  height: '4.4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.white,
  color: adminVars.slate600tw,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const modalDeleteButton = style({
  height: '4.4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.red600,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 6px rgba(220, 38, 38, 0.2)',

  ':hover': {
    backgroundColor: adminVars.red700,
  },
});

export const modalSaveButton = style({
  height: '4.4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow:
    '0 10px 15px rgba(15, 23, 43, 0.2), 0 4px 6px rgba(15, 23, 43, 0.2)',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

export const timeRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.6rem',
});
