import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';
import { recipe } from '@vanilla-extract/recipes';

export const card = style({
  ...themeVars.display.flexColumn,
  alignItems: 'center',
  gap: '0.8rem',
  width: '100%',
  position: 'relative',
  cursor: 'pointer',
});

export const poster = recipe({
  base: {
    width: '100%',
    aspectRatio: '0.704', // 100/142 ratio
    position: 'relative',
  },
  variants: {
    selectable: {
      true: { cursor: 'pointer' },
      false: { cursor: 'pointer' },
    },
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '1rem',
});

export const overlay = style(themeVars.overlay.default);

export const icon = style({
  width: '2.8rem',
  height: '2.8rem',
});

export const title = style([
  themeVars.fontStyles.body4_m_13,
  {
    width: '100%',
    textAlign: 'center',
    color: themeVars.color.black,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    whiteSpace: 'normal',
    wordBreak: 'keep-all',
    overflowWrap: 'break-word',
    lineHeight: '130%',
  },
]);
