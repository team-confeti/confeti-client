import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '3rem 2rem',
  gap: '3rem',
  backgroundColor: themeVars.color.white,
});

export const performanceInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
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

export const ticketInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
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
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  ...themeVars.fontStyles.body3_r_14,
});

export const priceDetail = style({
  display: 'flex',
  flexDirection: 'column',
});
