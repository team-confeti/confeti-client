export interface Performance {
  id: number;
  typeId: number;
  type: 'FESTIVAL' | 'CONCERT';
  title: string;
  place: string;
  date: string;
  posterUrl: string;
}

export interface PerformanceCarouselProps {
  data: Performance[];
  isPersonalized: boolean;
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
  onPerformanceClick?: (type: 'FESTIVAL' | 'CONCERT', typeId: number) => void;
}

export interface SlideTransform {
  scale: number;
  overlayOpacity: number;
}

export interface SlideData {
  data: Performance;
  typeId: number;
  index: number;
  position: number;
  distanceFromCenter: number;
  translateX: number;
  transform: SlideTransform;
  isCenter: boolean;
  isRightSlide: boolean;
  showInfo: boolean;
  infoOpacity: number;
  sideOverlayOpacity: number;
  zIndex: number;
}

export type SlideList = SlideData[];
