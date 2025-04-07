import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const button = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    // width: '100%',
    height: '4.4rem',
    padding: '1rem 2rem',
    margin: '0 2rem',
    border: `1px solid ${themeVars.color.gray300}`,
    borderRadius: '10px',
    backgroundColor: themeVars.color.white,
    cursor: 'pointer',
  },
  variants: {
    hasShadow: {
      true: {
        boxShadow: `${themeVars.shadowStyles.shadow_md_3}`,
      },
      false: {
        boxShadow: 'none',
      },
    },
  },
});

export const text = style({
  ...themeVars.display.flexAlignCenter,
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.subtitle4_b_14,
});

export const icon = style({
  width: '1.6rem',
  height: '1.6rem',
});
