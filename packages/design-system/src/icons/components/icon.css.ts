import { style } from '@vanilla-extract/css';

export const sprIcon = {
  base: style({
    display: 'inline-block',
  }),
  rotate90: style({ transform: 'rotate(90deg)' }),
  rotate180: style({ transform: 'rotate(180deg)' }),
  rotate270: style({ transform: 'rotate(270deg)' }),
};
