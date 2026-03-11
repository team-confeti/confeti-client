import { useSuspenseQuery } from '@tanstack/react-query';
import { ListMusic, Music, Tent } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CONCERT_QUERY_OPTIONS } from '@shared/apis/concert-queries';
import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import { FESTIVAL_QUERY_OPTIONS } from '@shared/apis/festival-queries';
import DashboardCard from '@shared/components/dashboard/dashboard-card';

import * as styles from './dashboard-page.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  const { data: draftsData } = useSuspenseQuery(DRAFT_QUERY_OPTIONS.LIST());
  const { data: festivalsData } = useSuspenseQuery(
    FESTIVAL_QUERY_OPTIONS.LIST(),
  );
  const { data: concertsData } = useSuspenseQuery(CONCERT_QUERY_OPTIONS.LIST());

  const pendingCount = draftsData.drafts.length;
  const festivalCount =
    festivalsData.upcomingFestivals.count +
    festivalsData.finishedFestivals.count;
  const concertCount =
    concertsData.upcomingConcerts.count + concertsData.finishedConcerts.count;

  return (
    <div className={styles.container}>
      <div className={styles.cardGrid}>
        <DashboardCard
          title="대기 중인 공연"
          count={pendingCount}
          icon={<ListMusic size={24} strokeWidth={2} />}
          variant="pending"
          onClick={() => navigate('/pending')}
        />
        <DashboardCard
          title="등록된 페스티벌"
          count={festivalCount}
          icon={<Tent size={24} strokeWidth={2} />}
          variant="festival"
          onClick={() => navigate('/festival')}
        />
        <DashboardCard
          title="등록된 콘서트"
          count={concertCount}
          icon={<Music size={24} strokeWidth={2} />}
          variant="concert"
          onClick={() => navigate('/concert')}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
