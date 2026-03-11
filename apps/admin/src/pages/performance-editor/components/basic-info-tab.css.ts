import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

// Radio Group
export const radioGroup = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.6rem',
});

export const radioCard = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  padding: '2rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '1.2rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: '#F9FAFB',
  },
});

export const radioCardActive = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  padding: '2rem',
  backgroundColor: themeVars.color.white,
  border: `2px solid ${themeVars.color.slate900}`,
  borderRadius: '1.2rem',
  cursor: 'pointer',
});

export const radioInput = style({
  position: 'absolute',
  width: '2rem',
  height: '2rem',
  top: '2rem',
  right: '2rem',
  cursor: 'pointer',
  accentColor: themeVars.color.slate900,
});

export const radioContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  paddingRight: '3rem',
});

export const radioLabel = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#101828',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const radioDescription = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#6A7282',
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

// Form
export const formRow = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.6rem',
  marginBottom: '1.6rem',

  ':last-child': {
    marginBottom: 0,
  },
});

// Sync Schedule Button
export const syncScheduleButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '4rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  marginTop: '1.6rem',
  marginLeft: 'auto',
  boxShadow: '0 4px 6px rgba(15, 23, 43, 0.1), 0 2px 4px rgba(15, 23, 43, 0.1)',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

// Booking Info
export const bookingHeader = style({
  marginBottom: '1.6rem',
});

export const bookingHeaderLabel = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  color: '#6A7282',
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

export const bookingCard = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.2rem',
  marginBottom: '1.6rem',
});

export const bookingCardContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto',
  gap: '1.6rem',
  alignItems: 'end',
});

export const bookingInputGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const deleteIconButton = style({
  width: '4.8rem',
  height: '4.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  color: '#6A7282',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
});

export const addButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '3.6rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  color: themeVars.color.slate700,
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray200,
  },
});

// Ticketing Platform
export const ticketingPlatformHeader = style({
  marginBottom: '1.2rem',
});

export const ticketingPlatformHeaderLabel = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  color: '#6A7282',
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

export const ticketingPlatformPillList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.2rem',
  marginBottom: '2.4rem',
});

export const ticketingPlatformPill = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '4.4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.white,
  color: '#6A7282',
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '9999px',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: '#F9FAFB',
  },
});

export const ticketingPlatformPillActive = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  height: '4.4rem',
  padding: '0 2rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: `1px solid ${themeVars.color.slate900}`,
  borderRadius: '9999px',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  cursor: 'pointer',
});

export const ticketingPlatformIcon = style({
  width: '2rem',
  height: '2rem',
  objectFit: 'contain',
  borderRadius: '0.4rem',
  flexShrink: 0,
});

export const ticketingPlatformCard = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.2rem',
  marginBottom: '1.6rem',
});

export const ticketingPlatformCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  marginBottom: '1.6rem',
});

export const ticketingPlatformLogo = style({
  width: '4rem',
  height: '4rem',
  objectFit: 'contain',
  backgroundColor: '#F9FAFB',
  borderRadius: '0.8rem',
  flexShrink: 0,
});

export const ticketingPlatformName = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: '#101828',
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const ticketingPlatformCardContent = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr auto',
  gap: '1.6rem',
  alignItems: 'center',
});

export const ticketingPlatformUrlInput = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '0 1.6rem',
  height: '4.8rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
});

export const ticketingPlatformDatetimeInput = style({
  display: 'flex',
  alignItems: 'center',
  height: '4.8rem',
});

export const ticketingPlatformDatetimeInputField = style({
  width: '100%',
  height: '4.8rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#101828',
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  outline: 'none',
  transition: 'all 0.2s ease',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 3px rgba(29, 41, 61, 0.1)',
  },
});

export const ticketingPlatformInput = style({
  flex: 1,
  border: 'none',
  outline: 'none',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: '#101828',
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  backgroundColor: 'transparent',

  '::placeholder': {
    color: '#98A2B3',
  },
});

export const linkIcon = style({
  fontSize: '1.6rem',
});

export const clockIcon = style({
  fontSize: '1.6rem',
});

export const calendarIcon = style({
  color: '#6A7282',
  flexShrink: 0,
});

export const ticketingPlatformDeleteButton = style({
  width: '4.8rem',
  height: '4.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  color: '#6A7282',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
  },
});
