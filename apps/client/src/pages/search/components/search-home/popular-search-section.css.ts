import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  ...themeVars.display.flexColumn,
  gap: '1.9rem',
  padding: '1rem 2rem',
});

export const header = style({
  ...themeVars.display.flexAlignCenter,
  height: '3rem',
});

export const title = style({
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title4_b_16,
});

export const columns = style({
  ...themeVars.display.flexBetween,
  gap: '2.3rem',
});

export const list = style({
  ...themeVars.display.flexColumn,
  gap: '1.4rem',
  flex: '1 1 0',
  minWidth: 0,
});

export const item = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1rem',
  width: '100%',
  cursor: 'pointer',
  color: themeVars.color.black,
  textAlign: 'left',
  ...themeVars.fontStyles.body3_r_14,
});

export const rank = recipe({
  base: {
    width: '1.6rem',
    flexShrink: 0,
    textAlign: 'left',
  },
  variants: {
    rank: {
      top: { color: themeVars.color.confeti_lime3 },
      default: { color: themeVars.color.black },
    },
  },
  defaultVariants: {
    rank: 'default',
  },
});

export const keyword = style({
  flex: 1,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
});
