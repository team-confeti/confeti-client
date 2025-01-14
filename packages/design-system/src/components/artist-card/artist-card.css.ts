import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';
import { style } from '@vanilla-extract/css';

export const artistCardVariants = recipe({
  base: {
    ...themeVars.display.flexColumnCenter,
    position: 'relative',
    gap: '1.2rem',
    cursor: 'pointer',
  },
  variants: {
    size: {
      sm: { width: '7rem' },
      md: { width: '8rem' },
      lg: { width: '9rem' },
    },
  },
});

export const artistImg = recipe({
  base: {
    borderRadius: '50%',
  },
  variants: {
    size: {
      sm: {
        width: '7rem',
        height: '7rem',
      },
      md: {
        width: '8rem',
        height: '8rem',
      },
      lg: {
        width: '9rem',
        height: '9rem',
      },
    },
  },
});

export const heartImg = style({
  position: 'absolute',
  top: '5.6rem',
  right: '0.05rem',
});

export const artistName = recipe({
  base: {
    width: '100%',
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 2, // 줄 수 제한
    WebkitBoxOrient: 'vertical', // 세로 방향으로 제한
    whiteSpace: 'normal', // 일반적인 공백 처리
    wordBreak: 'keep-all', // 단어 분리 없이 줄바꿈 (띄어쓰기 있을 경우)
    overflowWrap: 'break-word', // 단어 강제 분리 후 줄바꿈 (띄어쓰기 없을 경우)
    color: themeVars.color.black,
  },
  variants: {
    size: {
      sm: [themeVars.fontStyles.body4_m_13],
      md: [themeVars.fontStyles.body2_m_15],
      lg: [themeVars.fontStyles.body3_m_14],
    },
  },
});
