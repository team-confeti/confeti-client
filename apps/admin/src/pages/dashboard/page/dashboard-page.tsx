import { ListMusic, Music, Tent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import DashboardCard from '@shared/components/dashboard/dashboard-card';
import { CONCERTS, FESTIVALS, PENDING_ITEMS } from '@shared/mocks';

import * as styles from './dashboard-page.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.cardGrid}>
        <DashboardCard
          title="대기 중인 공연"
          count={PENDING_ITEMS.length}
          icon={<ListMusic size={24} strokeWidth={2} />}
          variant="pending"
          onClick={() => navigate('/pending')}
        />
        <DashboardCard
          title="등록된 페스티벌"
          count={FESTIVALS.length}
          icon={<Tent size={24} strokeWidth={2} />}
          variant="festival"
          onClick={() => navigate('/festival')}
        />
        <DashboardCard
          title="등록된 콘서트"
          count={CONCERTS.length}
          icon={<Music size={24} strokeWidth={2} />}
          variant="concert"
          onClick={() => navigate('/concert')}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
