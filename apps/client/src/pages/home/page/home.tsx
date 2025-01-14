import { Footer, TopCarousel } from '@confeti/design-system';
import { performData } from '@shared/mocks/top-carousel-mock';
import * as styles from './home.css';

const Home = () => {
  return (
    <>
      <div className={styles.mainStyle}>
        <TopCarousel performData={performData}></TopCarousel>
      </div>
      <Footer />
    </>
  );
};

export default Home;
