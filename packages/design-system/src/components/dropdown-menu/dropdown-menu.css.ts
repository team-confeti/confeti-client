import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const dropdownWrapper = style({
  position: 'relative',
});

export const triggerBtnStyle = recipe({
  base: {
    border: '1px solid black',
  },
  variants: {
    isToggleOpen: {
      true: {},
    },
  },
});

export const dropdownContent = recipe({
  base: {
    position: 'absolute', // 절대 위치
    right: 0, // 오른쪽 정렬
    top: '100%', // 트리거 버튼 아래에 배치
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
});
