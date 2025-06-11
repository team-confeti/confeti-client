import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem 0rem',
});

export const title = style({
  padding: '1rem 0',
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
});

export const iconWrapper = style({
  display: 'flex',
  gap: '1.2rem',
  padding: '1rem 0',
});

export const logoBox = recipe({
  base: {
    ...themeVars.display.flexJustifyAlignCenter,
    width: '3rem',
    height: '3rem',
    borderRadius: '1.5rem',
  },
  variants: {
    provider: {
      kakao: {
        backgroundColor: themeVars.color.yellow,
      },
      apple: {
        backgroundColor: themeVars.color.gray900,
      },
      kakaoDisabled: {
        backgroundColor: themeVars.color.gray100,
      },
      appleDisabled: {
        backgroundColor: themeVars.color.gray100,
      },
    },
  },
});
