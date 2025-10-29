import { NumberIndicator } from '@confeti/design-system';

import { useCarouselController } from '../hooks/use-carousel-controller';
import {
  ANIM_MS,
  OFFSET,
  type PerformanceCarouselProps,
} from '../types/performance-carousel-types';

import * as styles from './performance-carousel.css';

const PerformanceCarousel = ({
  data,
  autoPlayInterval = 5000,
  onSlideChange,
  onPerformanceClick,
}: PerformanceCarouselProps) => {
  const length = data?.length ?? 0;

  if (!Array.isArray(data) || length === 0) {
    return null;
  }

  const { dragOffset, isAnimating, rootRef, visibleSlides } =
    useCarouselController({
      data,
      autoPlayInterval,
      onSlideChange,
    });

  return (
    <div ref={rootRef} className={styles.root} aria-roledescription="carousel">
      <div className={styles.carouselTrack}>
        {visibleSlides.map((slide) => {
          const translateX = slide.position * OFFSET + dragOffset;
          const isCenter = slide.position === 0;
          const isRightSlide = slide.position === 1;

          // 가운데 슬라이드가 왼쪽으로 넘어가는 시점부터 오른쪽 슬라이드에 정보 표시
          const isTransitioning = isAnimating || dragOffset !== 0;
          const showInfo = isCenter || (isRightSlide && isTransitioning);

          // 정보 영역의 opacity를 부드럽게 전환
          const infoOpacity = (() => {
            if (isCenter) {
              // 가운데 슬라이드: 왼쪽으로 이동하면서 페이드아웃
              if (dragOffset < 0 || (isAnimating && dragOffset === 0)) {
                // 왼쪽으로 이동 중
                const progress = Math.abs(dragOffset) / OFFSET;
                return 1 - progress;
              }
              return 1;
            } else if (isRightSlide && isTransitioning) {
              // 오른쪽 슬라이드: 가운데로 오면서 페이드인
              if (dragOffset < 0 || (isAnimating && dragOffset === 0)) {
                const progress = Math.abs(dragOffset) / OFFSET;
                return progress;
              }
              return 0;
            }
            return 0;
          })();

          return (
            <div
              key={`${slide.index}-${slide.position}`}
              className={styles.slide}
              style={{
                left: '50%',
                transform: `translate(-50%, -50%) translateX(${translateX}px)`,
                transition: isAnimating
                  ? `transform ${ANIM_MS}ms ease`
                  : 'none',
                zIndex: isCenter ? 10 : 1,
              }}
            >
              <div
                className={isCenter ? styles.centerPoster : styles.sidePoster}
                style={{
                  transform: `scale(${slide.transform.scale})`,
                  transition: isAnimating
                    ? `transform ${ANIM_MS}ms ease`
                    : 'none',
                  cursor: isCenter ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (isCenter && onPerformanceClick) {
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

                {showInfo && (
                  <>
                    <div
                      className={styles.blackGradient}
                      style={{
                        opacity: infoOpacity,
                        transition: isAnimating
                          ? `opacity ${ANIM_MS}ms ease`
                          : 'none',
                      }}
                    />
                    <div
                      className={styles.infoWrap}
                      style={{
                        opacity: infoOpacity,
                        transition: isAnimating
                          ? `opacity ${ANIM_MS}ms ease`
                          : 'none',
                      }}
                    >
                      <p className={styles.title}>{slide.data.title}</p>
                      <p className={styles.place}>{slide.data.place}</p>
                      <div className={styles.dateIndicatorRow}>
                        <p className={styles.date}>{slide.data.date}</p>
                        {showInfo && (
                          <NumberIndicator
                            current={slide.index}
                            total={length}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={styles.sideOverlay}
                  style={{
                    opacity: (1 - infoOpacity) * slide.transform.overlayOpacity,
                    transition: isAnimating
                      ? `opacity ${ANIM_MS}ms ease`
                      : 'none',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceCarousel;
