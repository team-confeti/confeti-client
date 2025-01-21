import { useNavigate } from 'react-router-dom';
import {
  Footer,
  PerformanceCarousel,
  Navigation,
  TicketingCarousel,
} from '@confeti/design-system';
import { PERFORMANCE_DATA } from '@shared/mocks/banner-data';
import { USER_DATA } from '@shared/mocks/user-data';
import { TAB_MENU } from '../constants/menu';
import * as styles from './home.css';
import { USER_ID_KEY } from '@shared/constants/user-constants';
import { useUpcomingPerformances } from '../hooks/use-upcoming-performances';
import { routePath } from '@shared/constants/path';

const Home = () => {
  const { performanceCount, performances } = useUpcomingPerformances();
  const userId = localStorage.getItem(USER_ID_KEY);
  const userName = USER_DATA.data.userName;
  const isHighlighted = Number(userId) === USER_DATA.data.userId;
  const navigate = useNavigate();

  const handleGoHome = () => navigate(routePath.ROOT);
  const handleGoToTimeTable = () => navigate(routePath.TIME_TABLE_OUTLET);

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
              performData={PERFORMANCE_DATA}
            ></PerformanceCarousel>
          </section>
          <section className={styles.ticketingBannerContainer}>
            <p className={styles.ticketingBannerText}>
              {isHighlighted ? (
                <>
                  <span className={styles.highlightedText}>{userName}</span>
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
