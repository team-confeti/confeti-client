import * as styles from './infinite-carousel.css';
interface CarouselImageProps {
  children: React.ReactNode;
  className?: string;
}
interface CarouselInfoProps {
  day?: string;
  artist?: string;
  subtitle?: string;
}

const CarouselImage = ({ children }: CarouselImageProps) => (
  <section className={styles.container}>{children}</section>
);

const CarouselInfo = ({ day, artist, subtitle }: CarouselInfoProps) => (
  <div>
    <h2>{day}</h2>
    <h3>{artist}</h3>
    <p>{subtitle}</p>
  </div>
);

const InfiniteCarousel = {
  Image: CarouselImage,
  Info: CarouselInfo,
};

export default InfiniteCarousel;
