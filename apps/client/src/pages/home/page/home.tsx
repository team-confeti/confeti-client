import { Footer, Navigation } from '@confeti/design-system';

const Home = () => {
  return (
    <>
      <Navigation.Root defaultActiveTab={0}>
        <Navigation.List>
          <Navigation.Item index={0}>{'홈'}</Navigation.Item>
          <Navigation.Item index={1}>{'타임테이블'}</Navigation.Item>
        </Navigation.List>

        <Navigation.Panels>
          {/* TODO: 추후 페이지 연결 */}
          <Navigation.Panel>홈페이지</Navigation.Panel>
          <Navigation.Panel>타임테이블</Navigation.Panel>
        </Navigation.Panels>
      </Navigation.Root>

      <Footer />
    </>
  );
};

export default Home;
