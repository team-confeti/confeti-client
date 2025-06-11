import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const formContainer = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
});

export const tabWrapper = style({
  display: 'flex',
  gap: '2rem',
  marginBottom: '2rem',
  borderBottom: `1px solid ${themeVars.color.gray200}`,
});

export const tab = style({
  padding: '1rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: themeVars.fontSize.body3,
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

export const stageSection = style({
  ...themeVars.display.flexColumn,
  gap: '1.5rem',
  padding: '2rem',
  marginBottom: '1rem',
  border: `1px solid ${themeVars.color.gray300}`,
  backgroundColor: themeVars.color.white,
  borderRadius: '8px',
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

export const subSection = style({
  ...themeVars.display.flexColumn,
  gap: '1rem',
  padding: '1rem 2rem 2rem 2rem',
  marginBottom: '2rem',
  backgroundColor: themeVars.color.gray100,
  borderRadius: '12px',
  border: `1px solid ${themeVars.color.gray200}`,
  position: 'relative',
  transition: 'all 0.2s ease-in-out',
});

export const subTitle = style({
  fontSize: themeVars.fontSize.title3,
  fontWeight: themeVars.fontWeight.semibold,
  color: themeVars.color.gray700,
});

export const formWrapper = style({
  ...themeVars.display.flexColumn,
  gap: '2rem',
});

export const inputContainer = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem',

  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem',
    },
  },
});

export const artistInputContainer = style({
  display: 'flex',
  alignItems: 'flex-end',
  gap: '2rem',
  marginBottom: '2rem',
});

export const imageInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '0.5rem',
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
  alignSelf: 'flex-end',

  ':hover': {
    backgroundColor: '#F56565',
    transition: 'background-color 0.3s ease',
  },
});

export const deleteSmallButton = style({
  padding: '0.7rem 1.25rem',
  fontSize: themeVars.fontSize.body4,
  fontWeight: themeVars.fontWeight.medium,
  borderRadius: '6px',
  border: 'none',
  backgroundColor: themeVars.color.confeti_red,
  color: themeVars.color.white,

  ':hover': {
    backgroundColor: '#F56565',
    transition: 'background-color 0.3s ease',
  },
});

export const dateSection = style({
  marginBottom: '2rem',
  padding: '2rem',
  border: `1px solid ${themeVars.color.gray300}`,
  borderRadius: '8px',
});

export const dateHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: themeVars.color.gray300,
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
});

export const stageTabs = style({
  display: 'flex',
  gap: '1.5rem',
  marginBottom: '1rem',
  borderBottom: `1px solid ${themeVars.color.gray300}`,
});

export const stageContent = style({
  ...themeVars.display.flexColumn,
});

export const stageHeader = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
