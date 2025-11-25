import { Chip, NumberIndicator } from '@confeti/design-system';

import { CAROUSEL_ANIMATION } from '../constants/animation';
import { SlideData } from '../types/performance-carousel-types';

import * as styles from './slide-view.css';

interface SlideViewProps {
  slide: SlideData;
  isAnimating: boolean;
  length: number;
  isPersonalized: boolean;
  onPerformanceClick?: (type: 'FESTIVAL' | 'CONCERT', typeId: number) => void;
}

export const SlideView = ({
  slide,
  isAnimating,
  length,
  isPersonalized,
  onPerformanceClick,
}: SlideViewProps) => {
  const transitionTransform = isAnimating
    ? `transform ${CAROUSEL_ANIMATION.DURATION}ms ${CAROUSEL_ANIMATION.EASING}`
    : 'none';

  const transitionOpacity = isAnimating
    ? `opacity ${CAROUSEL_ANIMATION.DURATION}ms ${CAROUSEL_ANIMATION.EASING}`
    : 'none';

  return (
    <div
      className={styles.slide}
      style={{
        transform: `translate(-50%, -50%) translateX(${slide.translateX}px)`,
        transition: transitionTransform,
        zIndex: slide.zIndex,
      }}
    >
      <div
        className={slide.isCenter ? styles.centerPoster : styles.sidePoster}
        style={{
          transform: `scale(${slide.transform.scale})`,
          transition: transitionTransform,
          cursor: slide.isCenter ? 'pointer' : 'default',
        }}
        onClick={() => {
          if (slide.isCenter && onPerformanceClick) {
            onPerformanceClick(slide.data.type, slide.data.typeId);
          }
        }}
      >
        <img
          src={slide.data.posterUrl}
          alt={slide.data.title}
          className={styles.image}
          draggable={false}
        />

        <div className={styles.chipWrapper}>
          <Chip variant="assist">
            {isPersonalized ? '선호하는 아티스트' : '다가오는 공연'}
          </Chip>
        </div>

        {slide.showInfo && (
          <>
            <div
              className={styles.blackGradient}
              style={{
                opacity: slide.infoOpacity,
                transition: transitionOpacity,
              }}
            />
            <div
              className={styles.infoWrap}
              style={{
                opacity: slide.infoOpacity,
                transition: transitionOpacity,
              }}
            >
              <p className={styles.title}>{slide.data.title}</p>
              <p className={styles.place}>{slide.data.place}</p>

              <div className={styles.dateIndicatorRow}>
                <p className={styles.date}>{slide.data.date}</p>
                <NumberIndicator current={slide.index} total={length} />
              </div>
            </div>
          </>
        )}

        <div
          className={styles.sideOverlay}
          style={{
            opacity: slide.sideOverlayOpacity,
            transition: transitionOpacity,
          }}
        />
      </div>
    </div>
  );
};
