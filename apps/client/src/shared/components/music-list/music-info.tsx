import { useEffect, useRef } from 'react';

import { DotIndicator } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { RecommendPerformances } from '@shared/types/home-response';

import * as styles from './music-info.css';

interface MusicInfoProps {
  performances: RecommendPerformances[];
  total: number;
  current: number;
  onChangeIndex?: (index: number) => void;
  onClickDetail?: () => void;
}

const MusicInfo = ({
  performances,
  total,
  current,
  onChangeIndex,
  onClickDetail,
}: MusicInfoProps) => {
  const showDots = total > 1;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      if (!containerWidth) return;

      const newIndex = Math.round(scrollLeft / containerWidth);
      if (newIndex === current) return;
      if (newIndex < 0 || newIndex >= total) return;

      onChangeIndex?.(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [total, onChangeIndex]);

  const handleDotClick = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    container.scrollTo({
      left: index * containerWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        {performances.map((performance) => (
          <div key={performance.title} className={styles.slideSection}>
            <img src={performance.posterUrl} className={styles.poster} />
            <div className={styles.textSection}>
              <p className={styles.title}>{performance.title ?? ''}</p>
              <div className={styles.buttonSection}>
                <p className={styles.buttonText} onClick={onClickDetail}>
                  공연 상세정보 확인하기
                </p>
                <Icon name="arrow-horizontal" size={12} color="white" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {showDots && (
        <DotIndicator
          total={total}
          current={current}
          onDotClick={handleDotClick}
        />
      )}
    </div>
  );
};

export default MusicInfo;
