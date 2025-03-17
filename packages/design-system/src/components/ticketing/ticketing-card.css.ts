import { style } from '@vanilla-extract/css';
import { themeVars } from '../../styles';

export const root = style({
  width: '100%',
  height: '20rem',
  gap: '1rem',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
});

export const card = style({
  display: 'flex',
  width: '20rem',
  height: '20rem',
});

export const textSection = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  padding: '2rem',
  gap: '0.4rem',
});

export const Dday = style({
  color: themeVars.color.white,
  ...themeVars.fontStyles.title1_b_24,
});

export const subTitle = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.confeti_lime,
});

export const ticketInfoSection = style({
  ...themeVars.display.flexColumn,
  alignItems: 'flex-start',
  alignSelf: 'stretch',
  padding: '2rem',
  marginTop: '4.8rem',
});
