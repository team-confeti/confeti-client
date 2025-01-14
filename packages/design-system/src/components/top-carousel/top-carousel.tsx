import Slider from 'react-slick';
import './slick-theme.css';
import './slick.css';
import './dots.css';
import './top-carousel.css';
import Card from './card';
import { performData } from './mock';
import { useEffect, useRef } from 'react';

const TopCarousel = () => {
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    ref: sliderRef,
    className: 'center',
    dots: true,
    centerMode: true,
    infinite: true,
    centerPadding: '115px',
    slidesToShow: 1,
    sliceToScroll: 1,
    initialSlide: 3,
    speed: 500,
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
      <div className="topContainer">
        <Slider {...settings}>
          {performData.map((item) => (
            <Card key={item.performanceId} posterUrl={item.posterUrl}></Card>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default TopCarousel;
