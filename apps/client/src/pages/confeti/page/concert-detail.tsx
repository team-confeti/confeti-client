import { useState } from 'react';
import Info from '../components/info';
import Poster from '../components/poster';
import Summary from '../components/summary';
import MoreButton from '../components/more-button';
import PerformanceDetail from '../components/performance-detail';
import ArtistTitle from '../components/artist-title';
import ArtistList from '../components/artist-section';
import { Footer, Spacing } from '@confeti/design-system';
import * as styles from '@pages/confeti/page/detail.css';
import { CONCERT_DETAIL } from '../mocks/confeti-detail';

export default function ConcertDetailPage() {
  const { concert } = CONCERT_DETAIL;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Poster posterBgUrl={concert.posterBgUrl} posterUrl={concert.posterUrl} />
      <div className={styles.container}>
        <Summary
          title={concert.title}
          subtitle={concert.subtitle}
          startAt={concert.startAt}
          endAt={concert.endAt}
          area={concert.area}
          reserveAt={concert.reserveAt}
          reservationUrl={concert.reservationUrl}
        />
        <Info
          subtitle={concert.subtitle}
          area={concert.area}
          startAt={concert.startAt}
          endAt={concert.endAt}
          time={concert.time}
          ageRating={concert.ageRating}
          reservationOffice={concert.reservationOffice}
          price={concert.price}
        />
        <PerformanceDetail isExpanded={isExpanded} />
        <MoreButton
          hasShadow={true}
          isExpanded={isExpanded}
          onToggle={toggleExpanded}
        />
        <Spacing />
        <ArtistTitle />
        <ArtistList type="concert" artistData={CONCERT_DETAIL} />
        <Footer />
      </div>
    </>
  );
}
