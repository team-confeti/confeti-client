import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  ...themeVars.display.flexColumn,
  padding: '3rem 2rem',
  gap: '3rem',
  backgroundColor: themeVars.color.white,
});

export const section = recipe({
  base: {
    ...themeVars.display.flexColumn,
    gap: '1.6rem',
  },
  variants: {
    type: {
      performance: {},
      ticket: {},
    },
  },
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
});

export const content = style({
  ...themeVars.display.flexColumn,
  gap: '0.8rem',
});

export const subtitle = style({
  display: 'flex',
  gap: '0.8rem',
});
export const subtitleTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const subtitleContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const area = style({
  display: 'flex',
  gap: '0.8rem',
});

export const areaTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const areaContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const date = style({
  display: 'flex',
  gap: '0.8rem',
});

export const dateTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const dateContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const time = style({
  display: 'flex',
  gap: '0.8rem',
});

export const timeTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const timeContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const ageRating = style({
  display: 'flex',
  gap: '0.8rem',
});

export const ageRatingTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const ageRatingContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const reservationOffice = style({
  display: 'flex',
  gap: '0.8rem',
});

export const reservationOfficeTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const reservationOfficeContent = style({
  ...themeVars.fontStyles.body3_r_14,
});

export const price = style({
  display: 'flex',
  gap: '0.8rem',
});

export const priceTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const priceContent = style({
  ...themeVars.display.flexColumn,
  gap: '0.4rem',
  ...themeVars.fontStyles.body3_r_14,
});

export const priceDetail = style({
  ...themeVars.display.flexColumn,
});
