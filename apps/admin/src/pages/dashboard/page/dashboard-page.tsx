import { useState } from 'react';

import { TAB } from '@shared/constants/tab';

import ConcertDashboard from '../components/concert-dashboard';
import FestivalDashboard from '../components/festival-dashboard';

import * as styles from './dashboard-page.css';

const DashboardPage = () => {
  const [tab, setTab] = useState<TAB>(TAB.CONCERT);

  return (
    <div className={styles.container}>
      <div className={styles.tabWrapper}>
        <button
          className={tab === TAB.CONCERT ? styles.activeTab : styles.tab}
          onClick={() => setTab(TAB.CONCERT)}
        >
          콘서트
        </button>
        <button
          className={tab === TAB.FESTIVAL ? styles.activeTab : styles.tab}
          onClick={() => setTab(TAB.FESTIVAL)}
        >
          페스티벌
        </button>
      </div>
      <div>
        {tab === TAB.CONCERT && <ConcertDashboard />}
        {tab === TAB.FESTIVAL && <FestivalDashboard />}
      </div>
    </div>
  );
};

export default DashboardPage;
