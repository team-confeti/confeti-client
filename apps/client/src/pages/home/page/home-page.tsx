import { Spacing } from '@confeti/design-system';
import { formatDate } from '@confeti/utils';

import {
  FloatingButtonContainer,
  Footer,
  NavigationTabs,
} from '@shared/components';
import { useNavigateToDetail } from '@shared/hooks/use-navigate-to-detail';

import PerformanceCarouselSection from '../components/performance-carousel-section';
import SuggestMusicSection from '../components/suggest-music-section';
import SuggestPerformanceSection from '../components/suggest-performance-section';
import TicketOpeningSection from '../components/ticket-opening-section';
import { TAB_MENU } from '../constants/tab';
import { useHomeQueries } from '../hooks/use-home-queries';

const HomePage = () => {
  const navigateToDetail = useNavigateToDetail();

  const {
    userName,
    ticketing,
    latestPerformances,
    suggestPerformance,
    suggestMusicPerformance,
  } = useHomeQueries();

  // CarouselPerformances를 Performance 타입으로 변환
  const formattedCarouselData = latestPerformances.performances.map(
    (performance) => ({
      id: performance.performanceId,
      typeId: performance.typeId,
      type: performance.type,
      title: performance.title,
      place: performance.area,
      date: formatDate(performance.startAt),
      posterUrl: performance.posterUrl,
    }),
  );

  return (
    <div style={{ position: 'relative' }}>
      {formattedCarouselData.length > 0 && (
        <PerformanceCarouselSection
          data={formattedCarouselData}
          isPersonalized={latestPerformances.isPersonalized}
          onPerformanceClick={navigateToDetail}
        />
      )}
      <div
        style={{
          position: 'absolute',
          top: '5.4rem', // 헤더 높이만큼 아래에 위치
          left: 0,
          right: 0,
          zIndex: 15, // 헤더(20)보다 낮지만 캐러셀보다는 높게
        }}
      >
        <NavigationTabs defaultActiveTab={TAB_MENU.HOME} theme="transparent" />
      </div>

      <div data-ticket-section="true">
        <TicketOpeningSection
          userName={userName}
          data={ticketing.performances}
        />
      </div>

      <Spacing size="2xl" color="white" />

      <SuggestPerformanceSection data={suggestPerformance.performances} />
      <Spacing size="lg" color="white" />

      {suggestMusicPerformance && (
        <SuggestMusicSection data={suggestMusicPerformance} />
      )}
      <Spacing size="2xl" color="white" />

      <FloatingButtonContainer />
      <Footer />
    </div>
  );
};

export default HomePage;
