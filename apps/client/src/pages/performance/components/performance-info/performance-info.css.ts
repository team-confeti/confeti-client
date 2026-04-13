import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2.4rem 2rem',
  backgroundColor: themeVars.color.white,
});

export const wrapper = style({
  ...themeVars.display.flexColumn,
});

export const contentContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

export const header = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

export const sectionTitle = style({
  ...themeVars.fontStyles.title2_b_20,
  color: themeVars.color.black,
});

export const detail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

export const detailItem = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.2rem',
});

export const detailTitle = style({
  ...themeVars.fontStyles.subtitle4_b_14,
  color: themeVars.color.gray500,
});

export const detailContent = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.black,
});

export const reservationSchedule = style({
  ...themeVars.display.flexAlignCenter,
  flexWrap: 'wrap',
  gap: '0.8rem',
});

export const reservationScheduleItem = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  gap: '0.4rem',
  alignSelf: 'stretch',
});

export const reservationRoundName = style({
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.gray600,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2rem',
  padding: '0 0.8rem',
  borderRadius: '0.4rem',
  backgroundColor: themeVars.color.gray200,
});

export const reservationScheduleNotice = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray500,
});

export const detailContentList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

export const likeButton = style({
  width: '7.4%',
  height: '7.4%',
});
