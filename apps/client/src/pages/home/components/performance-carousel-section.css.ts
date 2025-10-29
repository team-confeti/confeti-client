import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const sectionContainer = style({
  position: 'relative',
  width: '100%',
  height: '56.4rem', // 전체 뷰포트 높이 사용
  overflow: 'hidden',
  marginTop: 0, // 상단 여백 제거
});

export const backgroundWrapper = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
});

export const backgroundImage = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(13px)',
  transform: 'scale(1.1)', // 블러 경계 숨기기
  transition: 'opacity 850ms ease', // 캐러셀 애니메이션과 동일한 시간
});

export const backgroundImageFront = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'blur(13px)',
  transform: 'scale(1.1)', // 블러 경계 숨기기
  transition: 'opacity 850ms ease', // 캐러셀 애니메이션과 동일한 시간
  zIndex: 2, // 앞쪽 이미지
});

export const backgroundOverlay = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: themeVars.color.gray_op,
  zIndex: 3, // 이미지들 위에 오버레이
});

export const carouselWrapper = style({
  position: 'relative',
  zIndex: 5,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
