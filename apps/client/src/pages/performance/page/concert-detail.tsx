import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import Info from '@pages/performance/components/info/info';
import Poster from '@pages/performance/components/poster/poster';
import Summary from '@pages/performance/components/summary/summary';
import MoreButton from '@pages/performance/components/button/more-button';
import PerformanceDetail from '@pages/performance/components/performance/performance-detail';
import ArtistTitle from '@pages/performance/components/artist/artist-title';
import ArtistSection from '@pages/performance/components/artist/artist-section';
import { useConcertDetail } from '@pages/performance/hooks/use-concert-detail';

const ConcertDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedConcertId = typeId ? Number(typeId) : 0;
  const [isMoreButton, setIsMoreButton] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const concertDetail = useConcertDetail(parsedConcertId);
  const { concert } = concertDetail;

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (concertDetail.concertArtists.length >= 4) {
      setIsMoreButton(true);
    }
  }, [concertDetail.concertArtists.length]);

  return (
    <>
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
      <ArtistSection
        type="concert"
        artistData={concertDetail}
        isMoreButton={isMoreButton}
      />
      <FloatingButton />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
