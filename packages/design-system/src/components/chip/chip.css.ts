import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

const choiceBaseStyle = {
  padding: '0.8rem 1.4rem',
  borderRadius: '1.7rem',
};

const inputBaseStyle = {
  padding: '0.6rem 1.4rem',
  borderRadius: '1.6rem',
};

const assistBaseStyle = {
  padding: '0.4rem 0.8rem',
  borderRadius: '1.3rem',
};

export const chipVariants = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition:
      'background-color 0.1s ease-in-out, color 0.1s ease-in-out, border 0.1s ease-in-out',
  },
  variants: {
    variant: {
      choice: choiceBaseStyle,
      input: {
        ...inputBaseStyle,
        ...themeVars.display.flexAlignCenter,
        gap: '0.2rem',
        backgroundColor: 'transparent',
        border: themeVars.border.gray300,
        color: themeVars.color.gray900,
        ...themeVars.fontStyles.body3_r_14,
        whiteSpace: 'nowrap',
      },
      assist: {
        ...assistBaseStyle,
        border: themeVars.border.lime4,
        background: themeVars.color.black_op,
        color: themeVars.color.confeti_lime,
        ...themeVars.fontStyles.body5_m_12,
      },
    },
    selected: {
      false: {},
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { variant: 'choice', selected: false },
      style: {
        border: themeVars.border.gray300,
        backgroundColor: themeVars.color.gray100,
        color: themeVars.color.gray600,
        ...themeVars.fontStyles.body3_m_14,
      },
    },
    {
      variants: { variant: 'choice', selected: true },
      style: {
        border: themeVars.border.lime2,
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
        ...themeVars.fontStyles.subtitle4_b_14,
        lineHeight: 'normal',
      },
    },
  ],
});
