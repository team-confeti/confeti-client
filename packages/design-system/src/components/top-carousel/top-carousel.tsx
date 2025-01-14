import { useRef, useState } from 'react';
import * as styles from './top-carousel.css';
import Card from './card';

const TopCarousel = () => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [transX, setTransX] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const mediateScroll = (scrollValue: number) => {
    if (scrollValue > 0) return 0;
    if (ref.current) {
      const maxScroll = ref.current.scrollWidth - ref.current.clientWidth;
      if (maxScroll > -scrollValue) return scrollValue;

      return -maxScroll;
    }
    return 0;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0]?.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const moveWidth = e.touches[0]?.clientX - touchStartX;
    setTransX((prev) => mediateScroll(prev + moveWidth));
    setTouchStartX(e.touches[0]?.clientX);
  };

  return (
    <>
      <div className={styles.topContainer}>
        <div
          ref={ref}
          className={styles.wrapper}
          style={{
            transform: `translateX(${transX}px)`,
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-out',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    </>
  );
};
export default TopCarousel;
