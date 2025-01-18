import { Footer, Navigation } from '@confeti/design-system';
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
          <Navigation.Panel>홈페이지</Navigation.Panel>
          <Navigation.Panel>타임테이블</Navigation.Panel>
        </Navigation.Panels>
      </Navigation.Root>
      <Footer />
    </>
  );
};

export default Home;
