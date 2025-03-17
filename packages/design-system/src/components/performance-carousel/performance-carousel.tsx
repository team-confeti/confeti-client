import type { Settings as SlickSettings } from 'react-slick';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import './slick.css';
import './dots.css';
import './performance-carousel.css';
import { useNavigate } from 'react-router-dom';

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

const SlideOverlay = () => (
  <svg
    className="slide-overlay"
    width="100%"
    height="98.6%"
    viewBox="0 0 156 208"
    preserveAspectRatio="none"
  >
    <path fill="#fff" fillOpacity={0.3} d="M0 0h156v208H0z" />
  </svg>
);

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

  const settings = {
    ref: sliderRef,
    className: 'center',
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '89px',
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
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyItems: 'center',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.6rem 0',
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom',
  };

  return (
    <>
      <PerformanceCarousel.Info
        date={performData[currentId]?.performanceAt || ''}
        title={performData[currentId]?.title || ''}
        subtitle={performData[currentId]?.subtitle || ''}
      />
      <PerformanceCarousel.Badge text=""></PerformanceCarousel.Badge>
      <PerformanceCarousel.ImageSlider
        performData={performData}
        activeIndex={activeIndex}
        settings={settings}
        onItemClick={handleContainerClick}
      />
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
  <div className="banner-title">
    <p className="title-date">{date}</p>
    <p className="title-name">{title}</p>
    <p className="title-sub">{subtitle}</p>
  </div>
);

const Badge = ({ text }: { text: string }) => <div>{text}</div>;

const ImageSlider = ({
  performData,
  activeIndex,
  settings,
  onItemClick,
}: {
  performData: PerformData[];
  activeIndex: number;
  settings: SlickSettings;
  onItemClick: (type: string, typeId: number) => void;
}) => {
  return (
    <Slider {...settings}>
      {performData.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item.type, item.typeId)}
          onFocus={(e) => e.currentTarget.blur()}
        >
          <img className="card" key={item.typeId} src={item.posterUrl} />
          {index !== activeIndex && <SlideOverlay />}
        </div>
      ))}
    </Slider>
  );
};

PerformanceCarousel.Info = Info;
PerformanceCarousel.Badge = Badge;
PerformanceCarousel.ImageSlider = ImageSlider;

export default PerformanceCarousel;
