import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const chipVariants = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: themeVars.border.gray300,
    cursor: 'pointer',
    transition:
      'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out',
  },
  variants: {
    variant: {
      home: {
        padding: '0.8rem 1.4rem',
        borderRadius: '1.7rem',
        backgroundColor: themeVars.color.gray100,
        color: themeVars.color.gray600,
        ...themeVars.fontStyles.body3_m_14,
      },
      search: {
        ...themeVars.display.flexAlignCenter,
        padding: '0.6rem 1.2rem',
        borderRadius: '1.6rem',
        gap: '0.2rem',
        backgroundColor: 'transparent',
        color: themeVars.color.gray900,
        ...themeVars.fontStyles.body3_r_14,
      },
    },
    isActive: {
      true: {
        border: themeVars.border.lime2,
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
        ...themeVars.fontStyles.subtitle4_b_14,
        lineHeight: 'normal',
      },
    },
  },
});
