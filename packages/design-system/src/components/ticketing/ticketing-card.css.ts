import { style } from '@vanilla-extract/css';

import { themeVars } from '../../styles';

export const imageField = style({
  ...themeVars.display.flexColumn,
  justifyContent: 'space-between',
  width: '100%',
  aspectRatio: '335 / 190',
  padding: '2rem',
  borderRadius: '1rem',
  flexShrink: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

export const textField = style({
  ...themeVars.display.flexColumn,
  width: '100%',
  height: '100%',
  alignItems: 'flex-start',
  gap: '0.4rem',
});

export const ddayContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '1.2rem',
  color: themeVars.color.white,
  ...themeVars.fontStyles.title1_b_24,
});

export const subTitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.confeti_lime,
  width: '16rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const performanceInfoButton = style({
  ...themeVars.display.flexAlignCenter,
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.white,
});
