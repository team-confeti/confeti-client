import { useEffect, ReactNode } from 'react';
import * as styles from './infinite-carousel.css';
import ProgressBar from './progress-bar/progress-bar';
import InfoButton from './info-button/info-button';
import { useCarouselData } from './hooks/use-carousel-data';
import { useCarouselSlide } from './hooks/use-carousel-slide';
import { useControlTime } from './hooks/use-control-time';
import { useDateFormat } from './hooks/use-data-format';
interface CarouselWrapProps {
  performances: {
    reservationBgUrl: string;
    subtitle: string;
    reserveAt: string;
    performanceId: number;
    type: string;
  }[];
  indexData: number;
}

interface CarouselContainerProps {
  children: React.ReactNode;
}

interface CarouselInfoProps {
  children: ReactNode;
}

interface CarouselDdayProps {
  reserveAt: string;
}

interface CarouselArtistProps {
  subtitle: string | undefined;
}

interface CarouselInfoBottomProps {
  children: ReactNode;
}

const CarouselWrap = ({ performances, indexData }: CarouselWrapProps) => {
  // 슬라이드 데이터
  const performanceData = useCarouselData(
    performances.map((item) => item.reservationBgUrl),
    performances.map((item) => item.subtitle),
    performances.map((item) => item.reserveAt),
    performances.map((item) => item.performanceId),
    performances.map((item) => item.type),
  );

  // 슬라이드 상태 관리
  const { currentIndex, carouselTransition, nextSlide } = useCarouselSlide(
    performanceData.images.length,
  );

  // 슬라이드 간격 관리
  const controlTime = useControlTime(carouselTransition);

  // 자동 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(nextSlide, controlTime);
    return () => clearInterval(interval);
  }, [nextSlide, controlTime]);
  const { dDay } = useDateFormat(
    performanceData.reserveDates[currentIndex] || '',
  );

  return (
    <section className={styles.wrap}>
      <div
        className={styles.imageContainer}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: carouselTransition,
        }}
      >
        {performanceData.images.map((imgUrl, id) => (
          <img
            key={id}
            src={imgUrl}
            alt={`캐러셀 이미지 ${id + 1}`}
            className={styles.image}
          />
        ))}
      </div>
      <InfiniteCarousel.Container>
        <InfiniteCarousel.Info>
          <InfiniteCarousel.Dday reserveAt={dDay} />
          <InfiniteCarousel.Artist
            subtitle={performanceData.subtitles[currentIndex]}
          />
          <InfiniteCarousel.InfoBottom>
            <InfoButton
              title={'공연 정보 확인하기'}
              performanceId={performanceData.performanceId[currentIndex]}
              performanceType={performanceData.type[currentIndex]}
            />
            <ProgressBar
              size="md"
              current={
                currentIndex === performanceData.images.length - 1
                  ? 1
                  : currentIndex
              }
              total={indexData}
            />
          </InfiniteCarousel.InfoBottom>
        </InfiniteCarousel.Info>
      </InfiniteCarousel.Container>
    </section>
  );
};

const CarouselContainer = ({ children }: CarouselContainerProps) => (
  <div className={styles.container}>{children}</div>
);

const CarouselInfo = ({ children }: CarouselInfoProps) => (
  <section className={styles.info}>
    <div className={styles.textSection}>{children}</div>
  </section>
);

const CarouselInfoBottom = ({ children }: CarouselInfoBottomProps) => (
  <div className={styles.infoBottom}>{children}</div>
);

const CarouselDday = ({ reserveAt }: CarouselDdayProps) => (
  <div className={styles.infoDday}>D-{reserveAt}</div>
);

const CarouselArtist = ({ subtitle }: CarouselArtistProps) => (
  <>
    <span className={styles.subtitle}>
      {subtitle} <span className={styles.fixedWord}>예매</span>
    </span>
  </>
);

const InfiniteCarousel = {
  Wrap: CarouselWrap,
  Container: CarouselContainer,
  Info: CarouselInfo,
  InfoBottom: CarouselInfoBottom,
  Dday: CarouselDday,
  Artist: CarouselArtist,
};

export default InfiniteCarousel;
