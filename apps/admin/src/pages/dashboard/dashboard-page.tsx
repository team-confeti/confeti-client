import { useState } from 'react';

import ConcertDashboard from './components/concert-dashboard';
import FestivalDashboard from './components/festival-dashboard';

import * as styles from './dashboard-page.css';

type Tab = 'concert' | 'festival';

const DashboardPage = () => {
  const [tab, setTab] = useState<Tab>('concert');

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <button
          className={tab === 'concert' ? styles.activeTab : styles.tab}
          onClick={() => setTab('concert')}
        >
          콘서트
        </button>
        <button
          className={tab === 'festival' ? styles.activeTab : styles.tab}
          onClick={() => setTab('festival')}
        >
          페스티벌
        </button>
      </div>
      <div>
        {tab === 'concert' && <ConcertDashboard />}
        {tab === 'festival' && <FestivalDashboard />}
      </div>
    </div>
  );
};

export default DashboardPage;
