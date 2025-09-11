import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Spacing } from '@confeti/design-system';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { FloatingButtonContainer, Footer, Hero } from '@shared/components';
import { addRecentViewItem } from '@shared/utils/recent-view';

import ConcertArtistSection from '@pages/performance/components/artist/concert-artist-section';
import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import PerformanceInfo from '@pages/performance/components/performance-info/performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';

import { openKakaoRoute } from '../utils/kakao-map';

const ConcertDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedConcertId = typeId ? Number(typeId) : 0;
  const { data: concertDetail } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.CONCERT(parsedConcertId),
  );
  const { concert } = concertDetail;

  if (concert.concertId) {
    addRecentViewItem({ type: 'concert', typeId: concert.concertId });
  }

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
        title={concert.subtitle}
        time={concert.time}
        ageRating={concert.ageRating}
        price={concert.price}
      />
      <Spacing />

      <Location
        address={concert.address}
        onClick={() =>
          openKakaoRoute({
            address: concert.address,
            name: concert.title,
            by: 'publictransit',
            useCurrentAsStart: true,
          })
        }
      />
      <Spacing />

      <ConcertArtistSection artists={concertDetail.concertArtists} />
      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default ConcertDetailPage;
