export interface Performance {
  id: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT';
  title: string;
  place: string;
  date: string; // 이미 format된 텍스트
  posterUrl: string;
}

export interface PerformanceCarouselProps {
  data: Performance[];
  isPersonalized: boolean;
  autoPlayInterval?: number; // ms
  onSlideChange?: (index: number) => void; // 0-based 원본 인덱스
  onPerformanceClick?: (type: 'FESTIVAL' | 'CONCERT', typeId: number) => void;
}

export interface SlideTransform {
  scale: number;
  overlayOpacity: number;
}

// 카드 크기 & 간격 상수
export const CENTER_W = 300;
export const SIDE_SCALE = 0.95; // 사이드 카드 스케일 (285/300 = 0.95)
export const GAP_PX = 20; // 2rem
export const OFFSET = CENTER_W / 2 + GAP_PX + (CENTER_W * SIDE_SCALE) / 2;

export const ANIM_MS = 850;
export const DRAG_THRESHOLD = 60;
