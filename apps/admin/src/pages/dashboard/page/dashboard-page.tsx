import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ChevronRight,
  ListMusic,
  Music,
  Plus,
  Tent,
  Ticket,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CONCERT_QUERY_OPTIONS } from '@shared/apis/concert-queries';
import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import { FESTIVAL_QUERY_OPTIONS } from '@shared/apis/festival-queries';
import DashboardCard from '@shared/components/dashboard/dashboard-card';
import { PATH } from '@shared/constants/path';
import { getConcertGroups } from '@shared/models/concert';
import { getDraftItems } from '@shared/models/draft';
import { getFestivalGroups } from '@shared/models/festival';

import * as styles from './dashboard-page.css';

const DashboardPage = () => {
  const navigate = useNavigate();

  const { data: draftsData } = useSuspenseQuery(DRAFT_QUERY_OPTIONS.LIST());
  const { data: festivalsData } = useSuspenseQuery(
    FESTIVAL_QUERY_OPTIONS.LIST(),
  );
  const { data: concertsData } = useSuspenseQuery(CONCERT_QUERY_OPTIONS.LIST());

  const draftItems = getDraftItems(draftsData);
  const festivalGroups = getFestivalGroups(festivalsData);
  const concertGroups = getConcertGroups(concertsData);

  const pendingCount = draftItems.length;
  const festivalCount =
    festivalGroups.upcomingFestivals.count +
    festivalGroups.finishedFestivals.count;
  const concertCount =
    concertGroups.upcomingConcerts.count + concertGroups.finishedConcerts.count;
  const recentDrafts = draftItems.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>대시보드</h1>
        <p className={styles.pageSubtitle}>
          공연 관리 현황을 한눈에 확인하세요.
        </p>
      </div>

      <div className={styles.cardGrid}>
        <DashboardCard
          title="대기 중인 공연"
          count={pendingCount}
          icon={<ListMusic size={24} strokeWidth={2} />}
          variant="pending"
          onClick={() => navigate(PATH.PENDING)}
        />
        <DashboardCard
          title="등록된 페스티벌"
          count={festivalCount}
          icon={<Tent size={24} strokeWidth={2} />}
          variant="festival"
          onClick={() => navigate(PATH.FESTIVAL)}
        />
        <DashboardCard
          title="등록된 콘서트"
          count={concertCount}
          icon={<Music size={24} strokeWidth={2} />}
          variant="concert"
          onClick={() => navigate(PATH.CONCERT)}
        />
      </div>

      {recentDrafts.length > 0 && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>주의 필요</h2>
            <span className={styles.sectionBadge}>{pendingCount}</span>
          </div>
          <div className={styles.attentionList}>
            {recentDrafts.map((item) => (
              <div
                key={item.id}
                className={styles.attentionItem}
                onClick={() =>
                  navigate(
                    PATH.PERFORMANCE_EDITOR.replace(':id', String(item.id)),
                  )
                }
              >
                <div
                  className={styles.attentionItemIcon}
                  style={{
                    backgroundColor:
                      item.performanceType === 'FESTIVAL'
                        ? '#AD46FF'
                        : '#00BC7D',
                  }}
                >
                  <span>{item.performanceType === 'FESTIVAL' ? 'F' : 'C'}</span>
                </div>
                <div className={styles.attentionItemInfo}>
                  <span className={styles.attentionItemTitle}>
                    {item.title}
                  </span>
                  <span className={styles.attentionItemMeta}>
                    {item.startAt} · {item.area || '장소 미정'}
                  </span>
                </div>
                <ChevronRight
                  size={16}
                  className={styles.attentionItemChevron}
                />
              </div>
            ))}
          </div>
          {pendingCount > 5 && (
            <button
              className={styles.viewAllButton}
              onClick={() => navigate(PATH.PENDING)}
            >
              전체 보기 ({pendingCount}개)
            </button>
          )}
        </div>
      )}

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>빠른 작업</h2>
        <div className={styles.quickActions}>
          <button
            className={styles.quickActionButton}
            onClick={() =>
              navigate(PATH.PERFORMANCE_EDITOR.replace(':id', 'new'))
            }
          >
            <Plus size={22} />
            <span>새 공연 등록</span>
          </button>
          <button
            className={styles.quickActionButton}
            onClick={() => navigate(PATH.FESTIVAL)}
          >
            <Tent size={22} />
            <span>페스티벌 관리</span>
          </button>
          <button
            className={styles.quickActionButton}
            onClick={() => navigate(PATH.CONCERT)}
          >
            <Music size={22} />
            <span>콘서트 관리</span>
          </button>
          <button
            className={styles.quickActionButton}
            onClick={() => navigate(PATH.TICKETING_PLATFORM)}
          >
            <Ticket size={22} />
            <span>예매처 관리</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
