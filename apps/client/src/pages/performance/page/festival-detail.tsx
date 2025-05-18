import { useParams } from 'react-router-dom';
import ArtistTitle from '@pages/performance/components/artist/artist-title';
import ArtistSection from '@pages/performance/components/artist/concert-artist-section';
import DetailInfo from '@pages/performance/components/detail-info/detail-info';
import Location from '@pages/performance/components/location/location';
import PerformanceInfo from '@pages/performance/components/performance-info/performance-info';
import Reservation from '@pages/performance/components/reservation/reservation';
import { useFestivalDetail } from '@pages/performance/hooks/use-festival-detail';

import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import Hero from '@shared/components/hero/hero';
import { useScrollPosition } from '@shared/hooks/use-scroll-position';
import { addRecentViewItem } from '@shared/utils/recent-view';

const FestivalDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedFestivalId = typeId ? Number(typeId) : 0;
  const festivalDetail = useFestivalDetail(parsedFestivalId);
  const { festival } = festivalDetail;
  const { isButtonHidden } = useScrollPosition();

  if (festival.festivalId) {
    addRecentViewItem({ type: 'festival', typeId: festival.festivalId });
  }

  return (
    <>
      <FloatingButton isButtonHidden={isButtonHidden} />
      <Hero
        posterBgUrl={festival.posterBgUrl}
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
        title={festival.title}
        time={festival.time}
        ageRating={festival.ageRating}
        price={festival.price}
      />
      <Location address={festival.address} />
      <Spacing />
      <ArtistTitle />
      <ArtistSection artists={festivalDetail.festivalDates} type="festival" />
      <Footer />
    </>
  );
};

export default FestivalDetailPage;
