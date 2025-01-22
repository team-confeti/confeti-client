import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '@confeti/design-system/styles';

export const itemsWrapper = recipe({
  base: {
    ...themeVars.display.flexColumnCenter,
    justifyContent: 'center',
    position: 'absolute',
    top: 'calc( 0.7rem + var(--top) )',
    left: 'calc( 3.1rem + ((100% - 3.1rem) / var(--stage-count) * var(--stage-order)))',
    height: 'var(--diff)',
    width: 'calc((100% - 3.1rem) / var(--stage-count))',
    padding: '0.8rem 0rem',
    borderRadius: '2px',
    zIndex: themeVars.zIndex.timeTable.content,
    cursor: 'pointer',
    transition: 'background-color 0.18s ease-out',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
      },
      false: {
        backgroundColor: themeVars.color.gray100,
        border: `1px solid ${themeVars.color.gray400}`,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});

export const alignContainer = style({
  ...themeVars.display.flexCenter,
  width: '100%',
  textAlign: 'center',
});

export const artistName = recipe({
  base: {
    width: '100%',
    ...themeVars.fontStyles.subtitle4_b_14,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  variants: {
    isSelected: {
      true: {
        color: themeVars.color.black,
      },
      false: {
        color: themeVars.color.gray500,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});

export const durationP = recipe({
  base: {
    ...themeVars.fontStyles.caption_r_10,
    whiteSpace: 'nowrap',
  },
  variants: {
    isSelected: {
      true: {
        color: themeVars.color.gray800,
      },
      false: {
        color: themeVars.color.gray500,
      },
    },
  },
  defaultVariants: {
    isSelected: true,
  },
});
