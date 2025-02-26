import { recipe } from '@vanilla-extract/recipes';
import { themeVars } from '../../styles';
import { style } from '@vanilla-extract/css';

export const artistCardVariants = recipe({
  base: {
    ...themeVars.display.flexColumnCenter,
    position: 'relative',
    gap: '1.2rem',
    cursor: 'pointer',
    height: 'auto',
    width: '100%',
  },
});
export const imageAndHeartWrapper = style({
  position: 'relative',
  width: '100%',
});

export const artistImg = recipe({
  base: {
    borderRadius: '50%',
    width: '100%',
    height: 'auto',
    aspectRatio: '1',
    objectFit: 'cover',
  },
});

export const heartImg = style({
  position: 'absolute',
  right: '0.05rem',
  bottom: 0,
  width: '31%',
  height: 'auto',
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
      sm: {
        ...themeVars.fontStyles.body4_m_13,
      },
      md: {
        ...themeVars.fontStyles.body2_m_15,
      },
      lg: {
        ...themeVars.fontStyles.body3_m_14,
      },
    },
  },
});
