import { Spacing } from '@confeti/design-system';

import {
  FloatingButtonContainer,
  Footer,
  NavigationTabs,
} from '@shared/components';
import { useMoveScroll } from '@shared/hooks/use-scroll-position';

import PerformanceCarouselSection from '../components/performance-carousel-section';
import SuggestMusicSection from '../components/suggest-music-section';
import SuggestPerformanceSection from '../components/suggest-performance-section';
import TicketingSection from '../components/ticketing-section';
import { TAB_MENU } from '../constants/tab';
import { useHomeQueries } from '../hooks/use-home-queries';

const HomePage = () => {
  const scrollRefs = {
    ticketing: useMoveScroll(),
    suggestPerformance: useMoveScroll(),
    suggestMusic: useMoveScroll(),
  };

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

      <TicketingSection
        ref={scrollRefs.ticketing.element}
        userName={userName}
        data={ticketing.performances}
      />
      <Spacing size="2xl" color="white" />

      <SuggestPerformanceSection
        ref={scrollRefs.suggestPerformance.element}
        data={suggestPerformance.performances}
      />
      <Spacing size="lg" color="white" />

      {suggestMusicPerformance && (
        <SuggestMusicSection
          ref={scrollRefs.suggestMusic.element}
          data={suggestMusicPerformance}
        />
      )}
      <Spacing size="2xl" color="white" />

      <FloatingButtonContainer />
      <Footer />
    </>
  );
};

export default HomePage;
