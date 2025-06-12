import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  flex: '1',
  ...themeVars.display.flexColumn,
});

export const searchBarContainer = style({
  padding: '0.8rem 2rem 0.8rem 2rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '0.5rem',
});

export const renderContentContainer = style({
  flex: 1,
  overflowY: 'auto',
  padding: '0 2rem',
});

export const buttonContainer = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white_grad,
});

export const musicListContainer = style({
  padding: '1rem 2rem 1rem 2rem',
  cursor: 'pointer',
});

export const listContainer = style({
  marginBottom: '1rem',
});
export const selectedComment = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray600,
  padding: '0.8rem 2rem',
  marginBottom: '0.4rem',
});

export const suggestionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '2rem',
  gap: '2rem',
});
