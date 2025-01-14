import { themeVars } from '../../styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  ...themeVars.display.flexCenter,
  width: '33.5rem',
  height: '19.3rem',
  flexShrink: '0',
  padding: '1.6rem, 1.2rem',
});

export const info = style({});
