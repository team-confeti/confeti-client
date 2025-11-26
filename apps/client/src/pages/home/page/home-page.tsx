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

import * as styles from './home-page.css';

const HomePage = () => {
  const navigateToDetail = useNavigateToDetail();

  const {
    userName,
    ticketing,
    latestPerformances,
    suggestPerformance,
    suggestMusicPerformance,
  } = useHomeQueries();

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
    <div className={styles.container}>
      {formattedCarouselData.length > 0 && (
        <PerformanceCarouselSection
          data={formattedCarouselData}
          isPersonalized={latestPerformances.isPersonalized}
          onPerformanceClick={navigateToDetail}
        />
      )}

      <div className={styles.navTabsWrapper}>
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
      <Spacing size="xl" color="white" />

      <FloatingButtonContainer />
      <Footer />
    </div>
  );
};

export default HomePage;
