import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Spacing } from '@confeti/design-system';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { FloatingButtonContainer, Footer, Hero } from '@shared/components';
import { addRecentViewItem } from '@shared/utils/recent-view';

import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import PerformanceInfo from '@pages/performance/components/performance-info/performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';

import FestivalArtistSection from '../components/artist/festival-artist-section';

const FestivalDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedFestivalId = typeId ? Number(typeId) : 0;
  const { data: festivalDetail } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.FESTIVAL(parsedFestivalId),
  );
  const { festival } = festivalDetail;

  if (festival.festivalId) {
    addRecentViewItem({ type: 'festival', typeId: festival.festivalId });
  }

  return (
    <>
      <Hero
        posterUrl={festival.posterUrl}
        title={festival.title}
        startAt={festival.startAt}
        onClickBack={() => window.history.back()}
      />
      <PerformanceInfo
        id={festival.festivalId}
        startAt={festival.startAt}
        endAt={festival.endAt}
        area={festival.area}
        reserveAt={festival.reserveAt}
        isFavorite={festival.isFavorite}
        type="FESTIVAL"
      />
      <Spacing />

      <Reservation reservations={festival.reservations} />
      <Spacing />

      <DetailInfo
        title={festival.subtitle}
        time={festival.time}
        ageRating={festival.ageRating}
        price={festival.price}
      />

      {/* 지도 섹션 */}
      <Location address={festival.address} />

      <Spacing />
      <FestivalArtistSection artists={festivalDetail.festivalDates} />
      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default FestivalDetailPage;
