import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
    width: '100%',
    height: height,
    borderRadius: '2px',
    zIndex: themeVars.zIndex.timeTable.content,
    cursor: 'pointer',
    borderTop: `1px solid ${themeVars.color.gray400}`,
    borderLeft: `1px solid ${themeVars.color.gray400}`,
    borderRight: 'none',
    borderBottom: 'none',
    boxShadow: `1px 0 0 0 ${themeVars.color.gray400}, 0 1px 0 0 ${themeVars.color.gray400}, 1px 1px 0 0 ${themeVars.color.gray400}`,
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: themeVars.color.confeti_lime,
        color: themeVars.color.black,
      },
      false: {
        backgroundColor: themeVars.color.gray100,
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
    backgroundColor: 'inherit',
    boxSizing: 'border-box',
    padding: '0 2px',
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
    backgroundColor: 'inherit',
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
