import { Footer, TopCarousel, Navigation } from '@confeti/design-system';
import { performData } from '@shared/mocks/top-carousel-mock';
import * as styles from './home.css';

import { TAB_MENU } from '../constants/menu';

const Home = () => {
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
            <div className={styles.mainStyle}>
              <TopCarousel performData={performData}></TopCarousel>
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
