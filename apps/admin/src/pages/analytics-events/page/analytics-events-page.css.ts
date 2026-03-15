import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const pageHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '2.4rem',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

export const pageTitle = style({
  margin: 0,
  fontSize: '3rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray900,
  lineHeight: '3.8rem',
});

export const pageSubtitle = style({
  marginTop: '0.8rem',
  marginBottom: 0,
  fontSize: '1.5rem',
  color: themeVars.color.gray600,
  lineHeight: '2.2rem',
});

export const headerMeta = style({
  minWidth: '24rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  padding: '1.6rem',
  borderRadius: '1.6rem',
  background:
    'linear-gradient(135deg, rgba(245, 247, 250, 1) 0%, rgba(232, 238, 248, 1) 100%)',
  border: `1px solid ${themeVars.color.gray200}`,
});

export const metaLabel = style({
  fontSize: '1.2rem',
  fontWeight: themeVars.fontWeight.medium,
  color: themeVars.color.gray600,
});

export const metaValue = style({
  fontSize: '1.6rem',
  color: themeVars.color.gray900,
});

export const command = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: '0.6rem 1rem',
  borderRadius: '9999px',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  fontSize: '1.2rem',
});

export const summaryGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))',
  gap: '1.6rem',
});

export const summaryCard = style({
  padding: '1.8rem',
  borderRadius: '1.6rem',
  border: `1px solid ${themeVars.color.gray200}`,
  backgroundColor: themeVars.color.white,
  boxShadow: '0 10px 30px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const summaryLabel = style({
  fontSize: '1.3rem',
  color: themeVars.color.gray600,
});

export const summaryValue = style({
  fontSize: '2.8rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray900,
  lineHeight: '3.4rem',
});

export const filterCard = style({
  padding: '2rem',
  borderRadius: '2rem',
  border: `1px solid ${themeVars.color.gray200}`,
  backgroundColor: themeVars.color.white,
  boxShadow: '0 16px 40px rgba(15, 23, 42, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const filterGrid = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(24rem, 2fr) repeat(3, minmax(16rem, 1fr))',
  gap: '1.2rem',
  '@media': {
    '(max-width: 1024px)': {
      gridTemplateColumns: '1fr 1fr',
    },
    '(max-width: 720px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const filterResult = style({
  margin: 0,
  fontSize: '1.4rem',
  color: themeVars.color.gray700,
});

export const groupList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});

export const pageSection = style({
  borderRadius: '2rem',
  overflow: 'hidden',
  border: `1px solid ${themeVars.color.gray200}`,
  backgroundColor: themeVars.color.white,
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.05)',
});

export const sectionHeader = style({
  padding: '2rem 2rem 1.6rem',
  background:
    'linear-gradient(180deg, rgba(248, 250, 252, 1) 0%, rgba(255, 255, 255, 1) 100%)',
  borderBottom: `1px solid ${themeVars.color.gray100}`,
});

export const sectionTitleBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const sectionTitle = style({
  margin: 0,
  fontSize: '2rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray900,
});

export const sectionMeta = style({
  display: 'flex',
  gap: '0.8rem',
  flexWrap: 'wrap',
});

export const eventTypeGroupList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  padding: '1.6rem 2rem 2rem',
});

export const eventTypeSection = style({
  padding: '1.6rem 0 0',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${themeVars.color.gray100}`,
      paddingBottom: '2rem',
    },
  },
});

export const eventTypeHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.2rem',
  paddingBottom: '1.2rem',
  '@media': {
    '(max-width: 720px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
});

export const eventTypeTitle = style({
  margin: 0,
  fontSize: '1.6rem',
  fontWeight: themeVars.fontWeight.bold,
  color: themeVars.color.gray800,
});

export const tableWrapper = style({
  overflowX: 'auto',
  paddingTop: '0.8rem',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const tableHead = style({
  backgroundColor: themeVars.color.gray50,
});

export const tableHeader = style({
  padding: '1.4rem 2rem',
  textAlign: 'left',
  fontSize: '1.3rem',
  fontWeight: themeVars.fontWeight.semibold,
  color: themeVars.color.gray700,
  verticalAlign: 'top',
});

export const tableRow = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${themeVars.color.gray100}`,
    },
  },
});

export const tableCell = style({
  padding: '1.8rem 2rem',
  verticalAlign: 'top',
});

export const eventCell = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const eventName = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: '0.6rem 0.8rem',
  borderRadius: '0.8rem',
  backgroundColor: themeVars.color.slate900,
  color: themeVars.color.white,
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
  whiteSpace: 'nowrap',
});

export const badgeRow = style({
  display: 'flex',
  gap: '0.8rem',
  flexWrap: 'wrap',
});

export const rowState = style({
  fontSize: '1.2rem',
  color: themeVars.color.gray600,
});

export const elementCell = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const elementTitle = style({
  fontSize: '1.5rem',
  color: themeVars.color.gray900,
});

export const subText = style({
  fontSize: '1.3rem',
  color: themeVars.color.gray600,
});

export const paramList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const paramCard = style({
  padding: '1rem 1.2rem',
  borderRadius: '1.2rem',
  backgroundColor: themeVars.color.gray50,
  border: `1px solid ${themeVars.color.gray100}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const paramHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1.2rem',
  alignItems: 'center',
});

export const paramType = style({
  fontSize: '1.1rem',
  color: themeVars.color.gray700,
  whiteSpace: 'nowrap',
});

export const paramMeta = style({
  fontSize: '1.2rem',
  color: themeVars.color.gray600,
});

export const sourceCell = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
});

export const sourceFile = style({
  display: 'inline-flex',
  alignSelf: 'flex-start',
  padding: '0.4rem 0.6rem',
  borderRadius: '0.8rem',
  backgroundColor: themeVars.color.gray50,
  color: themeVars.color.gray800,
  fontSize: '1.2rem',
  lineHeight: '1.8rem',
});

export const emptyValue = style({
  fontSize: '1.4rem',
  color: themeVars.color.gray500,
});
