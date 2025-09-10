import { useEffect } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';

import { Spacing } from '@confeti/design-system';

import { PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/performance/performance-queries';
import { FloatingButtonContainer, Footer, Hero } from '@shared/components';
import { buildEventJsonLd } from '@shared/utils/build-json-ld';
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

  const location = useLocation();
  const canonicalUrl = `${import.meta.env.VITE_SITE_URL}${location.pathname}`;

  const jsonLd = buildEventJsonLd({
    type: 'festival',
    data: festival,
    artists: festivalDetail.festivalDates.flatMap((d) => d.artists),
    canonicalUrl,
  });

  //디버깅용 - 추후 삭제
  useEffect(() => {
    console.log('JSON-LD:', jsonLd);

    // DOM에 실제로 추가되었는지 확인
    setTimeout(() => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      console.log('Found JSON-LD scripts:', scripts.length);
      scripts.forEach((script, index) => {
        console.log(`Script ${index}:`, script.textContent);
      });
    }, 3000);
  }, [jsonLd]);

  return (
    <>
      <Helmet>
        <title>{festival.title} | Confeti</title>
        <meta
          name="description"
          content={`${festival.title} - ${festival.area}`}
        />
        <meta property="og:title" content={`${festival.title} | Confeti`} />
        <meta
          property="og:description"
          content={`${festival.title} - ${festival.area}`}
        />
        <meta property="og:image" content={festival.posterUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
      <Location address={festival.address} />
      <Spacing />

      <FestivalArtistSection artists={festivalDetail.festivalDates} />
      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default FestivalDetailPage;
