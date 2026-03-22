import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

import { adminVars } from '@shared/styles/admin-tokens.css';

// Shared Artist Styles (used in both tabs and timetable)
export const artistAvatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: themeVars.color.gray200,
  borderRadius: '9999px',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate600tw,
});

export const artistName = style({
  flex: 1,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

// Timetable Specific Styles
export const timetableWrapper = style({
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1.4rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
});

export const timetableHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '2.4rem',
  flexWrap: 'wrap',
  padding: '1.6rem 2.4rem',
  backgroundColor: 'rgba(249, 250, 251, 0.5)',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
});

export const dayButtonGroup = style({
  display: 'flex',
  gap: '2.4rem',
  alignItems: 'center',
});

export const dayButtons = style({
  display: 'flex',
  gap: '0.4rem',
  padding: '0.4rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
});

export const dayButton = style({
  height: '3.2rem',
  padding: '0 1.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: themeVars.color.gray50,
  },
});

export const dayButtonActive = style({
  height: '3.2rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.slate900,
  border: 'none',
  borderRadius: '0.8rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.white,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
  cursor: 'pointer',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  whiteSpace: 'nowrap',
});

export const unassignedBadge = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const unassignedCount = style({
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.slate900,
});

export const ticketOpenAtPanel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  minWidth: '22rem',
});

export const ticketOpenAtMeta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.2rem',
});

export const ticketOpenAtTitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.gray900tw,
  lineHeight: '2rem',
  letterSpacing: '-0.011em',
});

export const ticketOpenAtDate = style({
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.8rem',
  letterSpacing: '-0.011em',
});

export const ticketOpenAtField = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const ticketOpenAtHint = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
  letterSpacing: '-0.011em',
});

export const timetableBody = style({
  display: 'flex',
  height: '53.4rem',
});

export const timetableArtistPanel = style({
  width: '25.6rem',
  backgroundColor: adminVars.gray50tw,
  borderRight: `1px solid ${themeVars.color.gray200}`,
  display: 'flex',
  flexDirection: 'column',
});

export const timetableArtistPanelHeader = style({
  padding: '1.6rem',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});

export const timetableArtistSearchBox = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

export const timetableArtistSearchInput = style({
  height: '3.8rem',
  paddingLeft: '3.6rem',
  paddingRight: '1.2rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.gray900tw,
  lineHeight: 'normal',
  letterSpacing: '-0.011em',
  outline: 'none',
  transition: 'all 0.2s ease',
  width: '100%',

  ':focus': {
    borderColor: themeVars.color.slate700,
    boxShadow: '0 0 0 2px rgba(29, 41, 61, 0.1)',
  },

  '::placeholder': {
    color: 'rgba(15, 23, 43, 0.5)',
  },
});

export const timetableSearchIcon = style({
  position: 'absolute',
  left: '1.2rem',
  color: adminVars.slate600tw,
  pointerEvents: 'none',
});

export const addUnregisteredButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  height: '3.2rem',
  padding: '0 1.6rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.bold,
  lineHeight: '1.6rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: '0 4px 6px rgba(15, 23, 43, 0.1), 0 2px 4px rgba(15, 23, 43, 0.1)',

  ':hover': {
    backgroundColor: themeVars.color.gray800,
  },
});

export const timetableArtistList = style({
  flex: 1,
  overflowY: 'auto',
  padding: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const timetableArtistItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.6rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  cursor: 'grab',
  transition: 'all 0.2s ease',

  ':hover': {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },

  ':active': {
    cursor: 'grabbing',
  },
});

export const timetableStageGrid = style({
  flex: 1,
  backgroundColor: 'rgba(248, 250, 252, 0.5)',
  overflowX: 'auto',
  padding: '1.6rem',
  display: 'flex',
  gap: '1.6rem',
});

export const stageColumn = style({
  flex: '0 0 28.8rem',
  backgroundColor: 'rgba(243, 244, 246, 0.5)',
  border: `1px solid rgba(229, 231, 235, 0.6)`,
  borderRadius: '1.4rem',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

export const stageColumnHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: `1px solid ${themeVars.color.gray200}`,
});

export const stageColumnTitle = style({
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.slate800,
  lineHeight: '2rem',
  letterSpacing: '0.2px',
  textTransform: 'uppercase',
});

export const stageColumnCount = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  padding: '0 0.8rem',
  backgroundColor: adminVars.gray100tw,
  borderRadius: '9999px',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
});

export const stageColumnContent = style({
  flex: 1,
  padding: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  overflowY: 'auto',
});

export const timeslotBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  padding: '1.3rem',
  backgroundColor: themeVars.color.white,
  border: `1px solid ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: '#FAFBFC',
  },
});

export const timeslotTime = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '0.4rem',
  height: '2rem',
  width: 'fit-content',
  paddingLeft: '0.6rem',
  paddingRight: '0.8rem',
});

export const timeslotTimeText = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
});

export const timeslotArtistName = style({
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: adminVars.gray900tw,
  lineHeight: '2.4rem',
  letterSpacing: '-0.02em',
});

export const timeslotDropZone = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  padding: '1.3rem',
  border: `2px dashed ${themeVars.color.gray200}`,
  borderRadius: '1rem',
  minHeight: '7.6rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease',

  ':hover': {
    borderColor: themeVars.color.slate700,
    backgroundColor: 'rgba(249, 250, 251, 0.5)',
  },
});

export const timeslotDropZoneText = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.regular,
  color: adminVars.slate400tw,
  lineHeight: '1.6rem',
});

export const timeslotDropZoneAction = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.medium,
  color: adminVars.slate600tw,
  lineHeight: '1.6rem',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
});

// Drag Overlay
export const dragOverlayItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '1.6rem',
  backgroundColor: themeVars.color.white,
  border: `2px solid ${themeVars.color.slate900}`,
  borderRadius: '1rem',
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
  cursor: 'grabbing',
  minWidth: '20rem',
});

export const dragOverlayTimeslot = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  padding: '1.3rem',
  backgroundColor: themeVars.color.white,
  border: `2px solid ${themeVars.color.slate900}`,
  borderRadius: '1rem',
  boxShadow:
    '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
  cursor: 'grabbing',
  minWidth: '26rem',
});

// Delete Drop Zone
export const deleteDropZone = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  padding: '2.4rem',
  backgroundColor: adminVars.red100,
  border: `2px dashed ${themeVars.color.red600}`,
  borderRadius: '1rem',
  color: themeVars.color.red600,
  fontSize: '1.4rem',
  fontWeight: themeVars.fontWeight.bold,
  textAlign: 'center',
  marginBottom: '1.2rem',
});
