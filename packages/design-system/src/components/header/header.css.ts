import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const container = recipe({
  base: {
    ...themeVars.display.flexAlignCenter,
    position: 'relative',
    backgroundColor: themeVars.color.white,
  },
  variants: {
    variant: {
      default: {
        height: '5.4rem',
        position: 'sticky',
        left: 0,
        top: 0,
        padding: '0 2rem',
        justifyContent: 'space-between',
        zIndex: themeVars.zIndex.header.content,
      },
      detail: {
        height: '4.4rem',
        padding: '1.2rem 0 1.2rem 2rem',
        borderBottom: themeVars.border.gray300,
      },
    },
  },
});

export const logo = style({
  width: '9.7059rem',
  height: '2.976rem',
  cursor: 'pointer',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const button = recipe({
  base: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },
  variants: {
    variant: {
      default: {
        width: '2.8rem',
        height: '2.8rem',
      },
      back: {
        width: '2rem',
        height: '2rem',
        position: 'absolute',
      },
    },
  },
});

export const icon = style({
  width: '100%',
  height: '100%',
});

export const settingsIcon = style({
  width: '2.4rem',
  height: '2.4rem',
  position: 'absolute',
  right: '2rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
});
