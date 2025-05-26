import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const headerContainer = style({
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'sticky',
  top: '5rem',
  height: '4.5rem',
  padding: '1.2rem 2rem 1.2rem 2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: `0px`,
  zIndex: themeVars.zIndex.header.content,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  padding: '1rem 2rem 1rem 2rem',
  position: 'sticky',
  top: '9.5rem',
  backgroundColor: themeVars.color.white,
  zIndex: themeVars.zIndex.header.content,
});

export const totalNumText = style({
  ...themeVars.fontStyles.title3_b_18,
});

export const confirmText = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray600,
});

export const buttonContainer = style({
  padding: '2rem',
  backgroundColor: themeVars.color.white_grad,
  position: 'fixed',
  bottom: 0,
  left: '50%',
  right: 0,
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});

export const musicListContainer = style({
  padding: '1rem 2rem 1rem 2rem',
});

export const totalNumTextHighlight = style({
  color: themeVars.color.confeti_lime3,
});

export const dialogTitleContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '13rem',
});

export const dialogHighlightText = style({
  color: themeVars.color.confeti_lime3,
  display: 'inline-block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
