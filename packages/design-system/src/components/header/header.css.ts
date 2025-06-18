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
        height: themeVars.size.height.header,
        position: 'sticky',
        left: 0,
        top: 0,
        padding: '0 2rem',
        justifyContent: 'space-between',
        zIndex: themeVars.zIndex.header.content,
      },
      detail: {
        height: '4.4rem',
        padding: '0 1.4rem',
        borderBottom: themeVars.border.gray300,
      },
    },
  },
});

export const logo = style({
  cursor: 'pointer',
});

export const iconSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const button = style({
  background: 'none',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
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
