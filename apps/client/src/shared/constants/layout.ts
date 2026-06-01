/**
 * 화면 layout에서 차감할 영역의 높이 상수.
 * AppSafeArea의 `subtract` prop이나 css calc 식에서 사용한다.
 *
 * 1rem = 10px (root font-size: 62.5%) 규칙을 따른다.
 */
export const LAYOUT_HEIGHT = {
  /** 글로벌 헤더 (Header). */
  GLOBAL_HEADER: '5.4rem',
  /** 페이지 헤더 (DetailHeader). */
  DETAIL_HEADER: '4.4rem',
  /** 글로벌 + 페이지 헤더 스택. */
  HEADERS_STACKED: '9.8rem',
  /** 하단 탭바(BottomNavigation) 전체 높이 (버튼 콘텐츠 + safe-area 하단 패딩). */
  BOTTOM_NAVIGATION: 'calc(5.8rem + max(2rem, env(safe-area-inset-bottom)))',
} as const;
