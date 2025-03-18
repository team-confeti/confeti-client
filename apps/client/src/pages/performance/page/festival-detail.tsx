import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ArtistSection from '@pages/performance/components/artist/artist-section';
import ArtistTitle from '@pages/performance/components/artist/artist-title';
import MoreButton from '@pages/performance/components/button/more-button';
import Info from '@pages/performance/components/info/info';
import PerformanceDetail from '@pages/performance/components/performance/performance-detail';
import Poster from '@pages/performance/components/poster/poster';
import Summary from '@pages/performance/components/summary/summary';
import { useFestivalDetail } from '@pages/performance/hooks/use-festival-detail';

import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import { useScrollPosition } from '@shared/hooks/use-scroll-position';

const FestivalDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedFestivalId = typeId ? Number(typeId) : 0;
  const festivalDetail = useFestivalDetail(parsedFestivalId);
  const [isExpanded, setIsExpanded] = useState(false);
  const { festival } = festivalDetail;
  const { isButtonHidden } = useScrollPosition();

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FloatingButton isButtonHidden={isButtonHidden} />
      <Poster
        posterBgUrl={festival.posterBgUrl}
        posterUrl={festival.posterUrl}
      />
      <Summary
        id={festival.festivalId}
        title={festival.title}
        subtitle={festival.subtitle}
        startAt={festival.startAt}
        endAt={festival.endAt}
        area={festival.area}
        reserveAt={festival.reserveAt}
        reservationUrl={festival.reservationUrl}
        isFavorite={festival.isFavorite}
        type="FESTIVAL"
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
      <PerformanceDetail
        isExpanded={isExpanded}
        infoImgUrl={festival.infoImgUrl}
        title={festival.title}
      />
      <MoreButton
        hasShadow={true}
        isExpanded={isExpanded}
        onToggle={toggleExpanded}
      />
      <Spacing />
      <ArtistTitle />
      <ArtistSection type="festival" artistData={festivalDetail} />
      <Footer />
    </>
  );
};

export default FestivalDetailPage;
