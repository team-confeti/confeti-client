import { recipe } from '@vanilla-extract/recipes';
import { createVar } from '@vanilla-extract/css';
import { themeVars } from '@confeti/design-system/styles';

export const left = createVar();
export const width = createVar();
export const top = createVar();
export const height = createVar();

export const itemsWrapper = recipe({
  base: {
    ...themeVars.display.flexColumnAlignTextCenter,
    justifyContent: 'center',
    position: 'absolute',
    top: top,
    left: left,
    height: height,
    width: width,
    borderRadius: '2px',
    zIndex: themeVars.zIndex.timeTable.content,
    cursor: 'pointer',
    transition: 'background-color 0.18s ease-out',
    tableLayout: 'fixed',
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
        border: `1px solid ${themeVars.color.gray400}`,
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

export const artistName = recipe({
  base: {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
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
