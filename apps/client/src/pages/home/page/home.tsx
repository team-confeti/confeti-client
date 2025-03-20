import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocialLoginMutation } from '@pages/login/hooks/use-social-login-mutation';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import {
  Footer,
  Navigation,
  PerformanceCarousel,
  TicketingCarousel,
} from '@confeti/design-system';
import { routePath } from '@shared/constants/path';

import { USER_ID_KEY } from '@shared/constants/user-constants';
import { USER_DATA } from '@shared/mocks/user-data';
import { formatDate } from '@shared/utils/format-date';


import { TAB_MENU } from '../constants/menu';
import { useLatestPerformances } from '../hooks/use-latest-performances';
import { useTicketing } from '../hooks/use-ticketing';

import * as styles from './home.css';

const Home = () => {
  const { performanceCount, performances } = useTicketing();
  const { latestPerformances } = useLatestPerformances();

  const displayPerformances =
    latestPerformances.length > 7
      ? latestPerformances.slice(0, 7)
      : latestPerformances;

  const formattedPerformData = displayPerformances.map((performance) => ({
    ...performance,
    performanceAt: formatDate(performance.performanceAt),
  }));

  const userId = localStorage.getItem(USER_ID_KEY);

  const { data: profileData } = useUserProfile();
  const navigate = useNavigate();
  const handleGoHome = () => navigate(routePath.ROOT);
  const handleGoToTimeTable = () => navigate(routePath.TIME_TABLE_OUTLET);

  const initialSlideIndex = Math.floor(formattedPerformData.length / 2);

  const { mutate: login } = useSocialLoginMutation();
  const kakaoRedirectUrl = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      login({
        provider: 'KAKAO',
        redirectUrl: kakaoRedirectUrl,
        code,
      });
    }
  }, [code]);


  return (
    <>
      <Navigation.Root defaultActiveTab={0}>
        <Navigation.List>
          <Navigation.Item index={0} handleTabClick={handleGoHome}>
            {TAB_MENU.HOME}
          </Navigation.Item>
          <Navigation.Item index={1} handleTabClick={handleGoToTimeTable}>
            {TAB_MENU.TIMETABLE}
          </Navigation.Item>
        </Navigation.List>

        <div className={styles.background}>
          <section className={styles.performanceBannerContainer}>
            <PerformanceCarousel
              performData={formattedPerformData}
              initialSlide={initialSlideIndex}
            >
              <PerformanceCarousel.ImageSlider>
                <PerformanceCarousel.Badge text="선호하는 아티스트" />
                <PerformanceCarousel.Info />
              </PerformanceCarousel.ImageSlider>
            </PerformanceCarousel>
          </section>
          <section className={styles.ticketingBannerContainer}>
            <p className={styles.ticketingBannerText}>
              {profileData ? (
                <>
                  <span className={styles.highlightedText}>
                    {profileData.username}
                  </span>
                  님 <br />
                  예매가 다가오고 있어요!
                </>
              ) : (
                <>
                  공연의 시작과 끝을 <br /> 콘페티와 함께해보세요!
                </>
              )}
            </p>
            <TicketingCarousel.Wrap
              performances={performances}
              indexData={performanceCount}
            />
          </section>
        </div>
      </Navigation.Root>
      <Footer />
    </>
  );
};

export default Home;
