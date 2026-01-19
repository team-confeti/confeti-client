import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.55rem',
});

export const leftContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  minHeight: '2.8rem',
});

export const totalCount = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.black,
});

export const rightContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const editButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  background: 'none',
  padding: '0.4rem 0.8rem',
  cursor: 'pointer',
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.black,
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  gap: '1.6rem',
});

export const emptyMessage = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray500,
  textAlign: 'center',
});

export const listWrapper = style({
  margin: '0 -2rem',
});

export const editModeButtons = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  ...themeVars.fontStyles.body3_m_14,
});

export const cancelButton = style({
  background: 'none',
  padding: 0,
  border: 'none',
  cursor: 'pointer',
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.body3_m_14,
});

export const deleteButton = recipe({
  base: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    ...themeVars.fontStyles.subtitle4_b_14,
    transition: 'color 0.2s ease',
  },
  variants: {
    isActive: {
      true: {
        color: themeVars.color.confeti_lime3,
        cursor: 'pointer',
      },
      false: {
        color: themeVars.color.gray400,
        cursor: 'not-allowed',
      },
    },
  },
  defaultVariants: {
    isActive: false,
  },
});

export const dialogHighlight = style({
  color: themeVars.color.confeti_lime3,
  ...themeVars.fontStyles.subtitle4_b_14,
});
