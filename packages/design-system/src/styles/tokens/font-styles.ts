import { typography } from './typography';

export const fontStyles = {
  // title
  title1_b_24: {
    fontSize: typography.fontSize.title1,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
  title2_b_20: {
    fontSize: typography.fontSize.title2,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.body6,
  },
  title3_b_18: {
    fontSize: typography.fontSize.title3,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
  title4_b_16: {
    fontSize: typography.fontSize.title4,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
  title5_b_15: {
    fontSize: typography.fontSize.title5,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },

  // subtitle
  subtitle1_m_18: {
    fontSize: typography.fontSize.subtitle1,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle2_sb_16: {
    fontSize: typography.fontSize.subtitle2,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle3_b_15: {
    fontSize: typography.fontSize.subtitle3,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle3_sb_15: {
    fontSize: typography.fontSize.subtitle3,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },
  subtitle4_b_14: {
    fontSize: typography.fontSize.subtitle4,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.subtitle4,
  },
  subtitle5_sb_12: {
    fontSize: typography.fontSize.subtitle5,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },

  // body
  body1_m_16: {
    fontSize: typography.fontSize.body1,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.body1,
  },
  body1_r_16: {
    fontSize: typography.fontSize.body1,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  body2_m_15: {
    fontSize: typography.fontSize.body2,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body2_r_15: {
    fontSize: typography.fontSize.body2,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  body3_m_14: {
    fontSize: typography.fontSize.body3,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body3_r_14: {
    fontSize: typography.fontSize.body3,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.body3,
  },
  body4_m_13: {
    fontSize: typography.fontSize.body4,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.body4,
  },
  body4_m_13_2: {
    fontSize: typography.fontSize.body4,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.body4_2,
  },
  body5_m_12: {
    fontSize: typography.fontSize.body5,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
  },
  body5_r_12: {
    fontSize: typography.fontSize.body5,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },
  body6_m_11: {
    fontSize: typography.fontSize.body6,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.body6,
  },

  // caption
  caption_m_11: {
    fontSize: typography.fontSize.caption1,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.caption1,
  },
  caption_b_10: {
    fontSize: typography.fontSize.caption2,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
  caption_r_10: {
    fontSize: typography.fontSize.caption2,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.normal,
  },

  // name
  name_b_18: {
    fontSize: typography.fontSize.name,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.normal,
  },
} as const;
