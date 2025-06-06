import { style } from '@vanilla-extract/css';

export const festivalButtonsWrapper = style({
  display: 'flex',
  gap: '1.4rem',
  overflow: 'scroll',
});

export const checkBox = style({
  appearance: 'none',
});

export const festivalButtonBox = style({
  position: 'relative',
});

export const checkboxBase = style({
  position: 'absolute',
  top: '1rem',
  right: '0',
  width: '2.2rem',
  height: '2.2rem',
});
