import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '@pages/confeti/components/info/info';
import Poster from '@pages/confeti/components/poster/poster';
import Summary from '@pages/confeti/components/summary/summary';
import MoreButton from '@pages/confeti/components/button/more-button';
import PerformanceDetail from '@pages/confeti/components/performance/performance-detail';
import ArtistTitle from '@pages/confeti/components/artist/artist-title';
import ArtistSection from '@pages/confeti/components/artist/artist-section';
import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import { useConcertDetail } from '@pages/confeti/hooks/use-concert-detail';

const ConcertDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedConcertId = typeId ? Number(typeId) : 0;
  const concertDetail = useConcertDetail(parsedConcertId);
  const [isExpanded, setIsExpanded] = useState(false);

  const { concert } = concertDetail;

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FloatingButton />
      <Poster posterBgUrl={concert.posterBgUrl} posterUrl={concert.posterUrl} />
      <Summary
        id={concert.concertId}
        title={concert.title}
        subtitle={concert.subtitle}
        startAt={concert.startAt}
        endAt={concert.endAt}
        area={concert.area}
        reserveAt={concert.reserveAt}
        reservationUrl={concert.reservationUrl}
        isFavorite={concert.isFavorite}
        type="CONCERT"
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
      <ArtistSection type="concert" artistData={concertDetail} />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
