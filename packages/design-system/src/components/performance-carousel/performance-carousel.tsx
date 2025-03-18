import type { Settings as SlickSettings } from 'react-slick';
import { useRef, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';
import './dots.css';
import { InfoOverlay, SlideOverlayOp } from '../../icons/src';

import * as styles from './performance-carousel.css';

export interface PerformData {
  typeId: number;
  type: 'CONCERT' | 'FESTIVAL' | 'ARTIST';
  title: string;
  subtitle?: string | null;
  performanceAt: string;
  posterUrl: string;
}

interface DataProps {
  performData: PerformData[];
}

const PerformanceCarousel = ({ performData }: DataProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(3);
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current?.slickNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleContainerClick = (type: string, typeId: number) => {
    navigate(`/${type}-detail/${typeId}`);
  };

  //slider의 settings 객체의 속성을 설정해줌으로써 슬라이드 커스텀
  const settings = {
    ref: sliderRef,
    className: 'center',
    dots: true,
    centerMode: true,
    infinite: true,
    variableWidth: true,
    centerPadding: '0px',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 1000,
    cssEase: 'ease-in-out',
    initialSlide: 3,
    beforeChange: (current: number, next: number) => {
      current; //빌드에러 제거용
      setCurrentId(next);
      setActiveIndex(next);
    },
    appendDots: (dots: string) => (
      <div className={styles.dots}>
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  return (
    <>
      <PerformanceCarousel.ImageSlider
        performData={performData}
        activeIndex={activeIndex}
        settings={settings}
        onItemClick={handleContainerClick}
      >
        <PerformanceCarousel.Badge text="선호하는 아티스트" />
        <PerformanceCarousel.Info
          date={performData[currentId]?.performanceAt || ''}
          title={performData[currentId]?.title || ''}
          subtitle={performData[currentId]?.subtitle || ''}
        />
      </PerformanceCarousel.ImageSlider>
    </>
  );
};

const Info = ({
  date,
  title,
  subtitle,
}: {
  date: string;
  title: string;
  subtitle: string;
}) => (
  <>
    <div className={styles.bannerTextWrapper}>
      <p className={styles.titleName}>{title}</p>
      <p className={styles.titleSub}>고양종합운동장</p>
      <p className={styles.titleDate}>{date}</p>
    </div>
  </>
);

const Badge = ({ text }: { text: string }) => (
  <div className={styles.badge}>{text}</div>
);

const ImageSlider = ({
  performData,
  activeIndex,
  settings,
  onItemClick,
  children,
}: {
  performData: PerformData[];
  activeIndex: number;
  settings: SlickSettings;
  onItemClick: (type: string, typeId: number) => void;
  children: ReactNode;
}) => {
  return (
    <>
      <Slider {...settings}>
        {performData.map((item, index) => (
          <div
            key={index}
            onClick={() => onItemClick(item.type, item.typeId)}
            onFocus={(e) => e.currentTarget.blur()}
            className={styles.imgDiv}
          >
            {children}
            <img
              className={styles.card}
              key={item.typeId}
              src={item.posterUrl}
              alt={item.title}
            />

            {index === activeIndex ? (
              <InfoOverlay
                className={styles.infoOverlay}
                width="96.5%"
                height="50%"
              />
            ) : (
              <SlideOverlayOp
                className={styles.slideOverlay}
                width="100%"
                height="100%"
              />
            )}
          </div>
        ))}
      </Slider>
    </>
  );
};

PerformanceCarousel.Info = Info;
PerformanceCarousel.Badge = Badge;
PerformanceCarousel.ImageSlider = ImageSlider;

export default PerformanceCarousel;
