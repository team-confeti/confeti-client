import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const rootStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '29.6rem',
  background: themeVars.color.white,
  padding: '1rem',
  borderRadius: '10px',
});

export const contentStyle = style({
  display: 'flex',
  gap: '1.2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0rem',
});

export const titleStyle = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const descriptionStyle = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray600,
});

export const actionStyle = style({
  display: 'flex',
  gap: '1.2rem',
});
