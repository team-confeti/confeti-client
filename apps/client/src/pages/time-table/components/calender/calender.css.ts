import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const noDataContainer = style({
  padding: '2rem',
  height: '14.4rem',
});

export const yearSection = style({
  ...themeVars.fontStyles.title5_b_15,
  color: themeVars.color.black,
});

export const dateSection = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7,1fr)',
  padding: '2.1rem 0rem',
  gap: '2rem',
});

export const dateItems = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  width: '3rem',
  height: '5.5rem',
  gap: '0.6rem',
});

export const dayNum = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    width: '3rem',
    height: '3rem',
    borderRadius: '1.5rem',
    cursor: 'pointer',
    background: 'transparent',
  },
  variants: {
    isSelected: {
      true: {
        background: themeVars.color.confeti_lime,
        transition: 'background 0.3s ease',
      },
    },
    hasFestivalDate: {
      true: {
        ...themeVars.fontStyles.title4_b_16,
        color: themeVars.color.black,
      },
      false: {
        ...themeVars.fontStyles.body1_r_16,
        color: themeVars.color.gray500,
        cursor: 'default',
      },
    },
  },
});

export const dayKo = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    background: 'transparent',
  },
  variants: {
    hasFestivalDate: {
      true: {
        ...themeVars.fontStyles.title4_b_16,
        color: themeVars.color.black,
      },
      false: {
        ...themeVars.fontStyles.body1_r_16,
        color: themeVars.color.gray500,
      },
    },
  },
});
