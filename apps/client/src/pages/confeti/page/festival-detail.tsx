// FestivalDetailPage.tsx
import { useState } from 'react';
import Poster from '../components/poster';
import Summary from '../components/summary';
import Info from '../components/info';
import MoreButton from '../components/more-button';
import PerformanceDetail from '../components/performance-detail';
import ArtistTitle from '../components/artist-title';
import ArtistList from '../components/artist-list';
import * as styles from '@pages/confeti/page/detail.css';
import { Footer, Spacing } from '@confeti/design-system';
import { festivalMock } from '../mocks/data';

export default function FestivalDetailPage() {
  const { festival } = festivalMock;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Poster
        posterBgUrl={festival.posterBgUrl}
        posterUrl={festival.posterUrl}
      />
      <div className={styles.container}>
        <Summary
          title={festival.title}
          subtitle={festival.subtitle}
          startAt={festival.startAt}
          endAt={festival.endAt}
          area={festival.area}
          reserveAt={festival.reserveAt}
          reservationUrl={festival.reservationUrl}
        />
        <Spacing />
        <Info
          subtitle={festival.subtitle}
          area={festival.area}
          startAt={festival.startAt}
          endAt={festival.endAt}
          time={festival.time}
          ageRating={festival.ageRating}
          reservationOffice={festival.reservationOffice}
          price={festival.price}
        />
        <Spacing />
        <PerformanceDetail isExpanded={isExpanded} />
        <MoreButton
          hasShadow={true}
          isExpanded={isExpanded}
          onToggle={toggleExpanded}
        />
        <Spacing />
        <ArtistTitle />
        <ArtistList type="festival" artistData={festivalMock} />
        <Footer />
      </div>
    </>
  );
}
