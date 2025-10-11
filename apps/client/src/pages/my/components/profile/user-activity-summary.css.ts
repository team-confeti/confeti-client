import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  ...themeVars.display.flexColumn,
  margin: '0.4rem 2rem 2rem 2rem',
  borderRadius: '10px',
  backgroundColor: themeVars.color.gray200,
});

export const itemWrapper = style({
  ...themeVars.display.flexBetweenAlignCenter,
  padding: '2rem',
  borderBottom: themeVars.border.gray300,
  selectors: {
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  ...themeVars.fontStyles.subtitle3_sb_15,
});

export const itemTextWrapper = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.5rem',
});

export const itemCountWrapper = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.8rem',
  cursor: 'pointer',
});

export const infoIcon = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  marginTop: '0.1rem',
});

export const itemText = style({
  color: themeVars.color.gray600,
});

export const totalPerformanceCount = style({
  marginRight: '2.5rem',
});

export const tooltipContent = style({
  marginLeft: '-2rem',
  marginBottom: '0.6rem',
});
