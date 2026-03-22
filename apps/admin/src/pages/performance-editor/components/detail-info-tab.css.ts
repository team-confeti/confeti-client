import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

export const twoColumnRow = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '2.4rem',
  alignItems: 'start',

  '@media': {
    '(max-width: 960px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

// Price
export const priceHeader = style({
  marginBottom: '1.6rem',
});

export const priceHeaderLabel = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

export const priceCard = style({
  display: 'grid',
  gridTemplateColumns: '1fr 160px auto',
  gap: '1.6rem',
  alignItems: 'center',
  marginBottom: '1.6rem',
});

export const priceGradeInput = style({
  height: '4.8rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.gray900tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
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

export const priceInputWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const priceIcon = style({
  position: 'absolute',
  left: '1.2rem',
  color: adminVars.slate600tw,
  pointerEvents: 'none',
});

export const priceInput = style({
  height: '4.8rem',
  paddingLeft: '3.6rem',
  paddingRight: '3.8rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '0.8rem',
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

export const priceSuffix = style({
  position: 'absolute',
  right: '1.2rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  pointerEvents: 'none',
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

// Upload
export const uploadGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3.2rem',
});

export const uploadBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2.4rem',
  border: `2px dashed ${themeVars.color.gray300}`,
  borderRadius: '1.4rem',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: '526px',

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: themeVars.color.gray50,
  },
});

export const uploadBoxSmall = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4rem 2.4rem',
  border: `2px dashed ${themeVars.color.gray300}`,
  borderRadius: '1.4rem',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  height: '222px',

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: themeVars.color.gray50,
  },
});

export const fileInput = style({
  display: 'none',
});

export const uploadIcon = style({
  color: adminVars.slate600tw,
  marginBottom: '1.6rem',
});

export const uploadTitle = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.semibold,
  color: adminVars.slate600tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
  marginBottom: '1.6rem',
  textAlign: 'center',
});

export const uploadDescription = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
  letterSpacing: '-0.011em',
  textAlign: 'center',
});

export const uploadDescriptionSingle = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
  letterSpacing: '-0.011em',
  textAlign: 'center',
});

export const uploadBoxWithImage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  border: `2px solid ${themeVars.color.gray300}`,
  borderRadius: '1.4rem',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minHeight: '526px',
  overflow: 'hidden',

  ':hover': {
    borderColor: themeVars.color.slate700,
  },
});

export const uploadBoxSmallWithImage = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  border: `2px solid ${themeVars.color.gray300}`,
  borderRadius: '1.4rem',
  backgroundColor: themeVars.color.white,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  height: '222px',
  overflow: 'hidden',

  ':hover': {
    borderColor: themeVars.color.slate700,
  },
});

export const previewImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const previewImageSmall = style({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  padding: '1.6rem',
});
