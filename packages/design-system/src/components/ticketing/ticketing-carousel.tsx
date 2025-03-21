import { ReactNode, useEffect } from 'react';

import { useCarouselData } from './hooks/use-carousel-data';
import { useCarouselSlide } from './hooks/use-carousel-slide';
import { useControlTime } from './hooks/use-control-time';
import { useDateFormat } from './hooks/use-data-format';
import InfoButton from './info-button/info-button';
import ProgressBar from './progress-bar/progress-bar';
import ProgressBar from './progress-bar/progress-bar';

import * as styles from './ticketing-carousel.css';
import * as styles from './ticketing-carousel.css';
interface CarouselWrapProps {
  performances: {
    index: number;
    reservationBgUrl: string;
    subtitle: string;
    reserveAt: string;
    typeId: number;
    type: string;
  }[];
  indexData: number;
}

interface CarouselContainerProps {
  children: React.ReactNode;
  currentImageId: number;
  performanceType: string;
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
    performances.map((item) => item.typeId),
    performances.map((item) => item.type),
    performances.map((item) => `/${item.type}-detail/${item.typeId}`),
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
    <div className={styles.wrap}>
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
      <TicketingCarousel.Container
        currentImageId={performanceData.typeId[currentIndex] ?? -1}
        performanceType={performanceData.type[currentIndex] || ''}
      >
        <TicketingCarousel.Info>
          <div className={styles.description}>
            <TicketingCarousel.Dday reserveAt={dDay} />
            <TicketingCarousel.Artist
              subtitle={performanceData.subtitles[currentIndex]}
            />
          </div>

          <TicketingCarousel.InfoBottom>
            <ProgressBar
              size="md"
              current={
                currentIndex === performanceData.images.length - 1
                  ? 1
                  : currentIndex
              }
              total={indexData}
            />
          </TicketingCarousel.InfoBottom>
        </TicketingCarousel.Info>
      </TicketingCarousel.Container>
    </div>
  );
};

const CarouselContainer = ({
  children,
  currentImageId,
  performanceType,
}: CarouselContainerProps) => {
  const navigate = useNavigate();

  const handleNavigateDetail = () => {
    if (performanceType === 'FESTIVAL') {
      navigate(`/festival-detail/${currentImageId}`);
    }
    if (performanceType === 'CONCERT') {
      navigate(`/concert-detail/${currentImageId}`);
    }
  };

  return (
    <div className={styles.container} onClick={handleNavigateDetail}>
      {children}
    </div>
  );
};

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

const TicketingCarousel = {
  Wrap: CarouselWrap,
  Container: CarouselContainer,
  Info: CarouselInfo,
  InfoBottom: CarouselInfoBottom,
  Dday: CarouselDday,
  Artist: CarouselArtist,
};

export default TicketingCarousel;
