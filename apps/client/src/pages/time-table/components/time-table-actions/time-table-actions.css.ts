import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const actionsWrapper = style({
  display: 'flex',
  padding: '2rem',
  gap: '0.8rem',
  background: themeVars.color.white_grad,
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'min(100%, var(--max-width))',
  maxWidth: '100%',
  zIndex: themeVars.zIndex.timeTableActions.content,
});

export const editButton = style({
  color: themeVars.color.confeti_lime2,
  backgroundColor: themeVars.color.gray800,
  flex: 1,
  height: '5rem',
  transition: 'all 0.18s ease-out',
});
