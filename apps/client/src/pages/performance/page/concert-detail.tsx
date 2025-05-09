import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistSection from '@pages/performance/components/artist/artist-section';
import ArtistTitle from '@pages/performance/components/artist/artist-title';
import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import PerformanceInfo from '@pages/performance/components/performance-info/performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';
import { useConcertDetail } from '@pages/performance/hooks/use-concert-detail';

import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import Hero from '@shared/components/hero/hero';
import { useScrollPosition } from '@shared/hooks/use-scroll-position';
import { addRecentViewItem } from '@shared/utils/recent-view';

const ConcertDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedConcertId = typeId ? Number(typeId) : 0;
  const [isMoreButton, setIsMoreButton] = useState(false);
  const concertDetail = useConcertDetail(parsedConcertId);
  const { concert } = concertDetail;
  const { isButtonHidden } = useScrollPosition();

  if (concert.concertId) {
    addRecentViewItem({ type: 'concert', typeId: concert.concertId });
  }

  useEffect(() => {
    if (concertDetail.concertArtists.length >= 4) {
      setIsMoreButton(true);
    }
  }, [concertDetail.concertArtists.length]);

  return (
    <>
      <Hero
        posterUrl={concert.posterUrl}
        title={concert.title}
        startAt={concert.startAt}
        onClickBack={() => window.history.back()}
      />
      <PerformanceInfo
        id={concert.concertId}
        startAt={concert.startAt}
        endAt={concert.endAt}
        area={concert.area}
        reserveAt={concert.reserveAt}
        isFavorite={concert.isFavorite}
        type="CONCERT"
      />
      <Spacing />
      <Reservation reservations={concert.reservations} />
      <Spacing />
      <DetailInfo
        title={concert.title}
        time={concert.time}
        ageRating={concert.ageRating}
        price={concert.price}
      />
      <Spacing />
      <Location address={concert.address} />
      <Spacing />
      <ArtistTitle />
      <ArtistSection
        type="concert"
        artistData={concertDetail}
        isMoreButton={isMoreButton}
      />
      <FloatingButton isButtonHidden={isButtonHidden} />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
