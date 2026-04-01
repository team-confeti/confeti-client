import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Spacing } from '@confeti/design-system';

import { LogShowEvent } from '@shared/analytics/logging';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { FloatingButtonContainer, Footer, Hero } from '@shared/components';
import { addRecentViewItem } from '@shared/utils/recent-view';

import ConcertArtistSection from '@pages/performance/components/artist/concert-artist-section';
import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import ConcertPerformanceInfo from '@pages/performance/components/performance-info/concert-performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';

const ConcertDetailPage = () => {
  const { concertId } = useParams<{ concertId: string }>();
  const { data: concertDetail } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(Number(concertId)),
  );
  const { concert } = concertDetail;

  if (concert.concertId) {
    addRecentViewItem({ type: 'concert', typeId: concert.concertId });
  }

  return (
    <>
      <LogShowEvent name="show_concert_detail" />
      <Hero
        posterUrl={concert.posterUrl}
        title={concert.title}
        startAt={concert.startAt}
        onClickBack={() => window.history.back()}
      />
      <ConcertPerformanceInfo
        id={concert.concertId}
        startAt={concert.startAt}
        endAt={concert.endAt}
        area={concert.area}
        reservationSchedules={concert.reservationSchedules}
        isFavorite={concert.isFavorite}
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

      <ConcertArtistSection artists={concertDetail.concertArtists} />
      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
