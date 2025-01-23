import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Poster from '@pages/confeti/components/poster/poster';
import Summary from '@pages/confeti/components/summary/summary';
import Info from '@pages/confeti/components/info/info';
import MoreButton from '@pages/confeti/components/button/more-button';
import PerformanceDetail from '@pages/confeti/components/performance/performance-detail';
import ArtistTitle from '@pages/confeti/components/artist/artist-title';
import ArtistSection from '@pages/confeti/components/artist/artist-section';
import { FloatingButton, Footer, Spacing } from '@confeti/design-system';
import { useFestivalDetail } from '@pages/confeti/hooks/use-festival-detail';

const FestivalDetailPage = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const parsedFestivalId = typeId ? Number(typeId) : 0;
  const festivalDetail = useFestivalDetail(parsedFestivalId);
  const [isExpanded, setIsExpanded] = useState(false);

  const { festival } = festivalDetail;

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <FloatingButton />
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
