import { FloatingButton, Footer, Spacing } from '@confeti/design-system';

import NavigationTabs from '@shared/components/navigation-tabs';
import {
  useMoveScroll,
  useScrollPosition,
} from '@shared/hooks/use-scroll-position';

import CategoryTabs from '../components/category-tabs';
import PerformanceCarouselSection from '../components/performance-carousel-section';
import SuggestMusicSection from '../components/suggest-music-section';
import SuggestPerformanceSection from '../components/suggest-performance-section';
import TicketingSection from '../components/ticketing-section';
import { TAB_MENU } from '../constants/menu';
import { useHomeQueries } from '../hooks/use-home-queries';

const HomePage = () => {
  const scrollRefs = {
    ticketing: useMoveScroll(),
    suggestPerformance: useMoveScroll(),
    suggestMusic: useMoveScroll(),
  };
  const { isButtonHidden } = useScrollPosition();

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
      <PerformanceCarouselSection data={latestPerformances.performances} />
      <Spacing size="xl" color="white" />

      <CategoryTabs
        scrollHandlers={{
          ticketing: scrollRefs.ticketing.onMoveToElement,
          suggestPerformance: scrollRefs.suggestPerformance.onMoveToElement,
          suggestMusic: scrollRefs.suggestMusic.onMoveToElement,
        }}
      />
      <Spacing size="lg" color="white" />

      <TicketingSection
        ref={scrollRefs.ticketing.element}
        data={ticketing.performances}
        userName={userName}
      />
      <Spacing size="2xl" color="white" />

      <SuggestPerformanceSection
        ref={scrollRefs.suggestPerformance.element}
        data={suggestPerformance.performances}
      />
      <Spacing size="lg" color="white" />

      <SuggestMusicSection
        ref={scrollRefs.suggestMusic.element}
        data={suggestMusicPerformance}
      />
      <Spacing size="2xl" color="white" />
      <FloatingButton isButtonHidden={isButtonHidden} />

      <Footer />
    </>
  );
};

export default HomePage;
