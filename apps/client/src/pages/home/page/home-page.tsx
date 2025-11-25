import { Spacing } from '@confeti/design-system';

import {
  FloatingButtonContainer,
  Footer,
  NavigationTabs,
} from '@shared/components';

import PerformanceCarouselSection from '../components/performance-carousel-section';
import SuggestMusicSection from '../components/suggest-music-section';
import SuggestPerformanceSection from '../components/suggest-performance-section';
import TicketOpeningSection from '../components/ticket-opening-section';
import { TAB_MENU } from '../constants/tab';
import { useHomeQueries } from '../hooks/use-home-queries';

const HomePage = () => {
  const {
    userName,
    ticketing,
    latestPerformances,
    suggestPerformance,
    suggestMusicPerformance,
  } = useHomeQueries();

  return (
    <>
      <NavigationTabs defaultActiveTab={TAB_MENU.HOME} />
      <PerformanceCarouselSection data={latestPerformances} />

      <TicketOpeningSection userName={userName} data={ticketing.performances} />
      <Spacing size="2xl" color="white" />

      <SuggestPerformanceSection data={suggestPerformance.performances} />
      <Spacing size="lg" color="white" />

      {suggestMusicPerformance && (
        <SuggestMusicSection data={suggestMusicPerformance} />
      )}
      <Spacing size="xl" color="white" />

      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default HomePage;
