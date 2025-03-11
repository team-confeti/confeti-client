import { style } from '@vanilla-extract/css';

import { themeVars } from '../../../styles';

export const layout = style({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '2rem',
});

export const colorBox = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
});

export const color = style({
  width: '100px',
  height: '100px',
});

export const name = style({
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray800,
});

export const meta = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray500,
});

export const colorGroup = style({
  marginBottom: '2rem',
});

export const groupTitle = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
});
