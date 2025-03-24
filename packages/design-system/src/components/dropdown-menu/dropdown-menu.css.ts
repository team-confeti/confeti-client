import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const dropdownWrapper = style({
  ...themeVars.fontStyles.subtitle3_b_15,
  position: 'absolute',
  zIndex: themeVars.zIndex.dropdown.content,
  lineHeight: 0,
  boxShadow: themeVars.shadowStyles.shadow_toast.boxShadow,
  borderRadius: '5px',
});

export const triggerBtnStyle = recipe({
  base: {},
  variants: {
    isToggleOpen: {
      true: {
        borderColor: themeVars.color.confeti_lime3,
      },
    },
  },
});

export const dropdownContent = recipe({
  base: {
    position: 'absolute',
    right: 0,
    top: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '1rem',
    gap: '1px',
    backgroundColor: themeVars.color.gray200,
    overflow: 'hidden',
  },
  variants: {
    isToggleOpen: {
      true: {
        boxShadow: themeVars.shadowStyles.shadow_home_poster.boxShadow,
      },
    },
  },
});

export const dropdownItem = style({
  display: 'flex',
  gap: '0.8rem',
  padding: '1.6rem',
  backgroundColor: themeVars.color.white,
  whiteSpace: 'nowrap',
  alignItems: 'center',
});
