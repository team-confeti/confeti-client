import {
  Footer,
  PerformanceCarousel,
  Navigation,
  TicketingCarousel,
} from '@confeti/design-system';
import {
  PERFORMANCE_DATA,
  PERFORMANCE_TICKETING_DATA,
} from '@shared/mocks/banner-data';
import { USER_DATA } from '@shared/mocks/user-data';
import { TAB_MENU } from '../constants/menu';
import * as styles from './home.css';
import { USER_ID_KEY } from '@shared/constants/user-constants';
import TimeTableSection from '@pages/time-table/components/time-table-section/time-table-section';

const Home = () => {
  const bannerData = PERFORMANCE_TICKETING_DATA?.data?.performances || [];
  const TotalIndexData = PERFORMANCE_TICKETING_DATA?.data?.performanceCount;

  const userId = localStorage.getItem(USER_ID_KEY);
  const userName = USER_DATA.data.userName;
  const isHighlighted = Number(userId) === USER_DATA.data.userId;

  return (
    <>
      <Navigation.Root defaultActiveTab={0}>
        <Navigation.List>
          <Navigation.Item index={0}>{TAB_MENU.HOME}</Navigation.Item>
          <Navigation.Item index={1}>{TAB_MENU.TIMETABLE}</Navigation.Item>
        </Navigation.List>
        <Navigation.Panels>
          {/* TODO: 추후 페이지 연결 */}
          <Navigation.Panel>
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
                  performances={bannerData}
                  indexData={TotalIndexData}
                />
              </section>
            </div>
          </Navigation.Panel>
          <Navigation.Panel>타임테이블</Navigation.Panel>
        </Navigation.Panels>
      </Navigation.Root>

      <Footer />
    </>
  );
};

export default Home;
