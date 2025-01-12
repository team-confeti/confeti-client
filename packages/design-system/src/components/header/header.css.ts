import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  height: '5rem',
  padding: '0.8rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const logo = style({
  width: '9.7059rem',
  height: '100%',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const iconButton = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  width: '2.4rem',
  height: '2.4rem',
});

export const icon = style({
  width: '100%',
  height: '100%',
});
