import { useState } from 'react';
import Poster from '../components/poster';
import Summary from '../components/summary';
import Info from '../components/info';
import MoreButton from '../components/more-button';
import PerformanceDetail from '../components/performance-detail';
import ArtistTitle from '../components/artist-title';
import ArtistSection from '../components/artist-section';
import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import { FESTIVAL_DETAIL } from '../mocks/confeti-detail';

export default function FestivalDetailPage() {
  const { festival } = FESTIVAL_DETAIL;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FloatingButton />
      <Poster
        posterBgUrl={festival.posterBgUrl}
        posterUrl={festival.posterUrl}
      />
      <Summary
        title={festival.title}
        subtitle={festival.subtitle}
        startAt={festival.startAt}
        endAt={festival.endAt}
        area={festival.area}
        reserveAt={festival.reserveAt}
        reservationUrl={festival.reservationUrl}
        isFavorite={festival.isFavorite}
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
      <ArtistSection type="festival" artistData={FESTIVAL_DETAIL} />
      <Footer />
    </>
  );
}
