import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import type { Settings as SlickSettings } from 'react-slick';

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

interface CarouselContextType {
  performData: PerformData[];
  activeIndex: number;
  sliderRef: React.RefObject<Slider | null>;
  settings: SlickSettings;
  handleContainerClick: (type: string, typeId: number) => void;
}

// Context 생성
const CarouselContext = createContext<CarouselContextType | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      'Carousel 컴포넌트는 PerformanceCarousel 내부에서만 사용할 수 있습니다.',
    );
  }
  return context;
};

// 메인 컴포넌트
const PerformanceCarousel = ({
  children,
  performData,
  initialSlide = 3,
}: {
  children: ReactNode;
  performData: PerformData[];
  initialSlide?: number;
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current?.slickNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleContainerClick = (type: string, typeId: number) => {
    navigate(`/${type}-detail/${typeId}`);
  };

  // 슬라이더 설정
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
    initialSlide: initialSlide,
    beforeChange: (_current: number, next: number) => {
      setActiveIndex(next);
    },
    appendDots: (dots: string) => (
      <div className={styles.dots}>
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  // Context 값
  const contextValue: CarouselContextType = {
    performData,
    activeIndex,
    sliderRef,
    settings,
    handleContainerClick,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div>{children}</div>
    </CarouselContext.Provider>
  );
};

const Info = () => {
  const { performData, activeIndex } = useCarousel();

  return (
    <div className={styles.bannerTextWrapper}>
      <p className={styles.titleName}>
        {performData[activeIndex]?.title || ''}
      </p>
      <p className={styles.titleSub}>고양종합운동장</p>
      <p className={styles.titleDate}>
        {performData[activeIndex]?.performanceAt || ''}
      </p>
    </div>
  );
};

const Badge = ({ text }: { text: string }) => (
  <div className={styles.badge}>{text}</div>
);

const ImageSlider = ({ children }: { children?: ReactNode }) => {
  const { performData, activeIndex, settings, handleContainerClick } =
    useCarousel();

  return (
    <Slider {...settings}>
      {performData.map((item, index) => (
        <div
          key={index}
          onClick={() => handleContainerClick(item.type, item.typeId)}
          onFocus={(e) => e.currentTarget.blur()}
          className={styles.imgDiv}
        >
          <img
            className={styles.card}
            key={item.typeId}
            src={item.posterUrl}
            alt={item.title}
          />

          {index === activeIndex ? (
            <>
              <InfoOverlay
                className={styles.infoOverlay}
                width="96.5%"
                height="50%"
              />
              {children}
            </>
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
  );
};

PerformanceCarousel.Info = Info;
PerformanceCarousel.Badge = Badge;
PerformanceCarousel.ImageSlider = ImageSlider;

export { PerformanceCarousel };
