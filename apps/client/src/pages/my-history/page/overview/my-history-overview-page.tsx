import CountDisplay from '@pages/my-history/components/overview/count-display';
import OrderByButton from '@pages/my-history/components/overview/order-by-button';

import { FestivalCard, Header } from '@confeti/design-system';

import * as styles from './my-history-overview-page.css';

const MyHistoryOverviewPage = () => {
  return (
    <>
      <Header variant="detail" title="My 타임테이블" />
      <section className={styles.overviewContainer}>
        <div className={styles.filterContainer}>
          <CountDisplay />
          <OrderByButton />
        </div>
        <div className={styles.gridContainer}>{/* <FestivalCard /> */}</div>
      </section>
    </>
  );
};

export default MyHistoryOverviewPage;
