import { useEffect, useRef, useState } from 'react';

import { DotIndicator, TicketingCard } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';
import { TicketingPerformances } from '@shared/types/home-response';

import * as styles from './ticket-opening-section.css';

const imageUrls = [
  '/images/img_dday01.svg',
  '/images/img_dday02.svg',
  '/images/img_dday03.svg',
  '/images/img_dday04.svg',
  '/images/img_dday05.svg',
];

interface Props {
  userName: string | null;
  data: TicketingPerformances[];
  ref: React.RefObject<HTMLDivElement | null>;
}

const TicketOpeningSection = ({ userName, data, ref }: Props) => {
  console.log(userName);
  const navigateToDetail = useNavigateToDetail();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const DdayList = data?.map((performance) => ({
    ...performance,
    reserveAt: formatDate(performance.reserveAt, 'Dday'),
  }));

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / containerWidth);
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    container.scrollTo({
      left: index * containerWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={ref}
      className={styles.ticketOpeningContainer({
        colorVariant: (currentIndex % 5) as 0 | 1 | 2 | 3 | 4,
      })}
    >
      <div className={styles.ticketOpeningBannerContainer}>
        <p className={styles.ticketOpeningBannerText}>티켓 오픈</p>
        <p className={styles.ticketOpeningBubble}>
          {userName
            ? '선호하는 공연 예매가 다가오고 있어요!'
            : '공연 예매가 다가오고 있어요!'}
        </p>
      </div>
      <div
        className={styles.ticketOpeningScrollContainer}
        ref={scrollContainerRef}
      >
        {data?.map((performance, index) => (
          <div key={performance.index} className={styles.ticketOpeningSection}>
            <div className={styles.ticketOpeningCardContainer}>
              <div className={styles.ticketOpeningCardWrapper}>
                <TicketingCard.Image
                  imageUrl={imageUrls[index]}
                  textContent={
                    <>
                      {/* TODO: startTime 서버 응답에 맞춰서 변경 */}
                      <TicketingCard.Dday
                        reserveAt={DdayList[index]?.reserveAt}
                        startTime="12:00"
                      />
                      <TicketingCard.SubTitle subtitle={performance.title} />
                    </>
                  }
                  performanceInfoContent={
                    <TicketingCard.PerformanceInfo
                      title={'티켓 정보 확인하기'}
                      typeId={performance.typeId}
                      performanceType={performance.type}
                      onClick={() =>
                        navigateToDetail(performance.type, performance.typeId)
                      }
                    />
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {data && (
        <DotIndicator
          total={data.length}
          current={currentIndex}
          onDotClick={scrollToSection}
        />
      )}
    </div>
  );
};

export default TicketOpeningSection;
