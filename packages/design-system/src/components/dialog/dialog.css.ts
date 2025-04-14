import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const backDropStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
    maxWidth: 'var(--max-width)', // 모바일 뷰 너비로 제한
    height: '100%',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    margin: 0,
  },
  variants: {
    backDrop: {
      true: {
        backgroundColor: themeVars.color.black_op,
        zIndex: themeVars.zIndex.backDrop.content,
        overflow: 'hidden',
      },
      false: {},
    },
  },
});

export const rootStyle = style({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '29.6rem',
  background: themeVars.color.white,
  padding: '1rem',
  borderRadius: '10px',
});

export const contentStyle = style({
  display: 'flex',
  gap: '1.2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem 0rem',
});

export const titleStyle = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const descriptionStyle = style({
  display: 'flex',
  textAlign: 'center',
  ...themeVars.fontStyles.body3_m_14,
  color: themeVars.color.gray600,
});

export const actionStyle = style({
  display: 'flex',
  gap: '1.2rem',
});
