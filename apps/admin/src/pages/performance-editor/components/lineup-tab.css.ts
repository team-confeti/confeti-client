import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';
// Stage
export const stageList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  marginBottom: '1.6rem',
});

export const stageRow = style({
  display: 'grid',
  gridTemplateColumns: '48px 1fr auto',
  gap: '1.2rem',
  alignItems: 'center',
});

export const stageNumber = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '48px',
  height: '48px',
  backgroundColor: themeVars.color.gray100,
  borderRadius: '1rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate400tw,
});

export const stageInput = style({
  height: '4.8rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.gray900tw,
  lineHeight: '2rem',
  letterSpacing: '-0.02em',
  outline: 'none',
  transition: 'all 0.2s ease',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 3px rgba(29, 41, 61, 0.1)',
  },

  '::placeholder': {
    color: adminVars.slate400tw,
  },
});

export const stageDeleteButton = style({
  width: '4.8rem',
  height: '4.8rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  color: adminVars.slate600tw,
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: adminVars.red100,
    color: themeVars.color.red600,
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

// Artist
export const artistSearchContainer = style({
  position: 'relative',
});

export const artistSearchWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const searchIcon = style({
  position: 'absolute',
  left: '1.6rem',
  color: adminVars.slate600tw,
  pointerEvents: 'none',
});

export const artistSearchInput = style({
  height: '4.8rem',
  paddingLeft: '4.4rem',
  paddingRight: '1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.gray900tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  outline: 'none',
  transition: 'all 0.2s ease',
  width: '100%',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 3px rgba(29, 41, 61, 0.1)',
  },

  '::placeholder': {
    color: adminVars.slate400tw,
  },
});

export const artistDropdown = style({
  position: 'absolute',
  top: 'calc(100% + 0.8rem)',
  left: 0,
  right: 0,
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  maxHeight: '32rem',
  overflowY: 'auto',
  zIndex: 10,
});

export const artistDropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.6rem',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const artistDropdownAvatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: themeVars.color.gray200,
  borderRadius: '9999px',
  overflow: 'hidden',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate600tw,
  flexShrink: 0,
});

export const artistDropdownName = style({
  flex: 1,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const artistDropdownIcon = style({
  color: adminVars.slate600tw,
  flexShrink: 0,
});

export const artistDropdownEmpty = style({
  padding: '2rem',
  textAlign: 'center',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const artistDropdownCustom = style({
  display: 'block',
  width: '100%',
  padding: '1.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderTop: `1px solid ${themeVars.color.gray200}`,
  textAlign: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const artistDropdownCustomText = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.slate900,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  textDecoration: 'underline',
});

export const artistList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  marginTop: '1.6rem',
});

export const lineupGuideText = style({
  marginTop: '1.2rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const artistCard = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  padding: '1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const artistCardHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  width: '100%',
});

export const artistAvatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: themeVars.color.gray200,
  borderRadius: '9999px',
  overflow: 'hidden',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate600tw,
});

export const artistAvatarImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

export const artistName = style({
  flex: 1,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const artistDeleteButton = style({
  width: '32px',
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.6rem',
  color: adminVars.slate600tw,
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    backgroundColor: adminVars.red100,
    color: themeVars.color.red600,
  },
});

export const artistFestivalDateList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
});

export const artistFestivalDateSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  width: '100%',
});

export const artistFestivalDateSectionLabel = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  letterSpacing: '-0.01em',
});

const artistFestivalDateButtonBase = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.8rem 1.2rem',
  borderRadius: '9999px',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
} as const;

export const artistFestivalDateButton = style({
  ...artistFestivalDateButtonBase,
  color: adminVars.slate600tw,

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: themeVars.color.gray50,
  },
});

export const artistFestivalDateButtonActive = style({
  ...artistFestivalDateButtonBase,
  backgroundColor: themeVars.color.slate900,
  borderColor: themeVars.color.slate900,
  color: themeVars.color.white,
});

export const artistFestivalDateLabel = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  letterSpacing: '-0.01em',
});

export const artistFestivalDateValue = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  letterSpacing: '-0.01em',
});

// Timetable Navigation
export const timetableNavigation = style({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: '1.6rem',
  marginTop: '2.4rem',
});

export const timetableNavigationButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  height: '4.8rem',
  padding: '0 2.4rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1.4rem',
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
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
