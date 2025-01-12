import { Footer, Navigation } from '@confeti/design-system';

const Home = () => {
  return (
    <>
      <Navigation.Root defaultActiveTab={0}>
        <Navigation.Item index={0}>{'홈'}</Navigation.Item>
        <Navigation.Item index={1}>{'타임테이블'}</Navigation.Item>
      </Navigation.Root>
      <Footer />
    </>
  );
};

export default Home;
