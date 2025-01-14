import * as styles from './infinite-carousel.css';
import { ReactNode } from 'react';
interface CarouselImageProps {
  children: React.ReactNode;
}
interface CarouselInfoProps {
  children: ReactNode;
  artist?: string;
  subtitle?: string;
}

interface CarouselDdayProps {
  day: string;
}

interface CarouselArtistProps {
  artist: string;
  subtitle: string;
}

const CarouselImage = ({ children }: CarouselImageProps) => (
  <section className={styles.wrap}>
    <div className={styles.container}>{children}</div>
  </section>
);

const CarouselInfo = ({ children }: CarouselInfoProps) => (
  <section className={styles.info}>
    <div className={styles.textSection}>{children}</div>
    <div className={styles.infoBottom}>{children}</div>
  </section>
);

const CarouselDday = ({ day }: CarouselDdayProps) => (
  <div className={styles.infoDday}>D-{day}</div>
);

const CarouselArtist = ({ artist, subtitle }: CarouselArtistProps) => (
  <div className={styles.artist}>
    {artist} <span className={styles.subtitle}>{subtitle}</span>
  </div>
);

const InfiniteCarousel = {
  Image: CarouselImage,
  Info: CarouselInfo,
  Dday: CarouselDday,
  Artist: CarouselArtist,
};

export default InfiniteCarousel;
