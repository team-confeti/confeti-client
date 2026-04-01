import { useSuspenseQuery } from '@tanstack/react-query';
import { useLoaderData, useParams } from 'react-router-dom';

import { Spacing } from '@confeti/design-system';

import { LogShowEvent } from '@shared/analytics/logging';
import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { FloatingButtonContainer, Footer, Hero } from '@shared/components';
import { TimetableExistsResponse } from '@shared/types/festival-timetable-response';
import { addRecentViewItem } from '@shared/utils/recent-view';

import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import FestivalPerformanceInfo from '@pages/performance/components/performance-info/festival-performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';

import FestivalArtistSection from '../components/artist/festival-artist-section';

const FestivalDetailPage = () => {
  const { festivalId } = useParams<{ festivalId: string }>();
  const timetableExistsData = useLoaderData<TimetableExistsResponse>();
  const { data: festivalDetail } = useSuspenseQuery(
    PERFORMANCE_QUERY_OPTIONS.FESTIVAL(Number(festivalId)),
  );

  if (festivalDetail.festival.festivalId) {
    addRecentViewItem({
      type: 'festival',
      typeId: festivalDetail.festival.festivalId,
    });
  }

  return (
    <>
      <LogShowEvent name="show_festival_detail" />
      <Hero
        posterUrl={festivalDetail.festival.posterUrl}
        title={festivalDetail.festival.title}
        startAt={festivalDetail.festival.startAt}
        onClickBack={() => window.history.back()}
      />
      <FestivalPerformanceInfo
        id={festivalDetail.festival.festivalId}
        startAt={festivalDetail.festival.startAt}
        endAt={festivalDetail.festival.endAt}
        area={festivalDetail.festival.area}
        reservationSchedules={festivalDetail.festival.reservationSchedules}
        isFavorite={festivalDetail.festival.isFavorite}
        timetableId={timetableExistsData?.timetableId ?? null}
      />
      <Spacing />

      <Reservation reservations={festivalDetail.festival.reservations} />
      <Spacing />

      <DetailInfo
        title={festivalDetail.festival.title}
        time={festivalDetail.festival.time}
        ageRating={festivalDetail.festival.ageRating}
        price={festivalDetail.festival.price}
      />

      {/* 지도 섹션 */}
      <Location address={festivalDetail.festival.address} />

      <Spacing />
      <FestivalArtistSection artists={festivalDetail.festivalDates} />
      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default FestivalDetailPage;
