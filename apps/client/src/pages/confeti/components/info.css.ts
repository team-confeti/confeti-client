import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  ...themeVars.display.flexColumn,
  padding: '3rem 2rem',
  gap: '3rem',
  backgroundColor: themeVars.color.white,
});

export const section = style({
  ...themeVars.display.flexColumn,
  gap: '1.6rem',
});

export const title = recipe({
  base: {
    ...themeVars.fontStyles.title3_b_18,
    color: themeVars.color.black,
  },
  variants: {
    size: {
      sm: themeVars.fontStyles.body3_m_14,
      md: themeVars.fontStyles.subtitle4_b_14,
      lg: themeVars.fontStyles.title3_b_18,
    },
    color: {
      primary: { color: themeVars.color.gray500 },
      secondary: { color: themeVars.color.black },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'secondary',
  },
});

export const content = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
});

export const detail = style({
  display: 'flex',
  gap: '0.8rem',
});

export const text = recipe({
  base: themeVars.fontStyles.body3_r_14,
  variants: {
    type: {
      label: themeVars.fontStyles.subtitle4_b_14,
      value: themeVars.fontStyles.body3_r_14,
    },
    color: {
      gray: { color: themeVars.color.gray500 },
      black: { color: themeVars.color.black },
    },
  },
  defaultVariants: {
    type: 'value',
    color: 'black',
  },
});

export const priceContent = style({
  ...themeVars.display.flexColumn,
  gap: '0.4rem',
  ...themeVars.fontStyles.body3_r_14,
});

export const priceDetail = style({
  ...themeVars.display.flexColumn,
});
