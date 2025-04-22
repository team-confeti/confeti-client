import { useEffect } from 'react';
import { useSocialLoginMutation } from '@pages/login/hooks/use-social-login-mutation';

import { Footer, Spacing } from '@confeti/design-system';
import NavigationTabs from '@shared/components/navigation-tabs';
import { CONFIG } from '@shared/constants/api';

import PerformanceCarouselSection from '../components/performance-carousel-section';
import SuggestMusicSection from '../components/suggest-music-section';
import SuggestPerformanceSection from '../components/suggest-performance-section';
import TicketingSection from '../components/ticketing-section';
import { TAB_MENU } from '../constants/menu';

const Home = () => {
  const { mutate: login } = useSocialLoginMutation();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      login({
        provider: 'KAKAO',
        redirectUrl: CONFIG.KAKAO_REDIRECT_URI,
        code,
      });
    }
  }, [code]);

  return (
    <>
      <NavigationTabs defaultActiveTab={TAB_MENU.HOME} />

      <PerformanceCarouselSection />
      <Spacing size="xl" color="white" />

      <TicketingSection />
      <Spacing size="2xl" color="white" />

      <SuggestPerformanceSection />
      <Spacing size="lg" color="white" />

      <SuggestMusicSection />

      <Footer />
    </>
  );
};

export default Home;
