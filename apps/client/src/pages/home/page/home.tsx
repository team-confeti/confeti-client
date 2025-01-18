import { Footer, Navigation } from '@confeti/design-system';
import { TAB_MENU } from '../constants/menu';
import TimeTableSection from '@pages/time-table/components/time-table-section/time-table-section';

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
          <Navigation.Panel>홈페이지</Navigation.Panel>
          <Navigation.Panel>
            <TimeTableSection></TimeTableSection>
          </Navigation.Panel>
        </Navigation.Panels>
      </Navigation.Root>
      <Footer />
    </>
  );
};

export default Home;
