import { useState } from 'react';
import Info from '@pages/confeti/components/info/info.tsx';
import Poster from '@pages/confeti/components/poster/poster.tsx';
import Summary from '@pages/confeti/components/summary/summary.tsx';
import MoreButton from '@pages/confeti/components/button/more-button.tsx';
import PerformanceDetail from '@pages/confeti/components/performance/performance-detail.tsx';
import ArtistTitle from '../components/artist/artist-title.tsx';
import ArtistSection from '../components/artist/artist-section.tsx';
import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import { CONCERT_DETAIL } from '../mocks/confeti-detail';

const ConcertDetailPage = () => {
  const { concert } = CONCERT_DETAIL;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FloatingButton />
      <Poster posterBgUrl={concert.posterBgUrl} posterUrl={concert.posterUrl} />
      <Summary
        title={concert.title}
        subtitle={concert.subtitle}
        startAt={concert.startAt}
        endAt={concert.endAt}
        area={concert.area}
        reserveAt={concert.reserveAt}
        reservationUrl={concert.reservationUrl}
        isFavorite={concert.isFavorite}
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
      <PerformanceDetail
        isExpanded={isExpanded}
        infoImgUrl={concert.infoImgUrl}
        title={concert.title}
      />
      <MoreButton
        hasShadow={true}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
      />
      <Spacing />
      <ArtistTitle />
      <ArtistSection type="concert" artistData={CONCERT_DETAIL} />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
