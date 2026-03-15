import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Chip, Spacing } from '@confeti/design-system';

import {
  LogClickEvent,
  logClickEvent,
  LogShowEvent,
} from '@shared/analytics/logging';
import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { DetailHeader, Footer } from '@shared/components';
import {
  MyPerformances,
  PerformancesFilterType,
} from '@shared/types/user-response';
import { isDatePast } from '@shared/utils/check-date-past';

import EmptyPerformance from '@pages/my/components/performance/empty-performance';
import PerformanceList from '@pages/my/components/performance/performance-list';

import { PastPerformanceToggle } from './past-performance-toggle';

import * as styles from './performance-more.css';

const categories = ['전체', '콘서트', '페스티벌'] as const;

const filterOngoingPerformances = (
  performances: MyPerformances[],
): MyPerformances[] => {
  return performances.filter((performance) => !isDatePast(performance.endAt));
};

const PerformanceMore = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [hidePastPerformances, setHidePastPerformances] = useState(false);

  const filterType = useMemo<PerformancesFilterType>(() => {
    switch (selectedCategory) {
      case '콘서트':
        return 'CONCERT';
      case '페스티벌':
        return 'FESTIVAL';
      default:
        return 'ALL';
    }
  }, [selectedCategory]);

  const { data } = useSuspenseQuery({
    ...USER_QUERY_OPTIONS.MY_PERFORMANCES(filterType),
  });

  const displayedPerformances = useMemo(() => {
    const performances = data.performances ?? [];

    if (hidePastPerformances) {
      return filterOngoingPerformances(performances);
    }

    return performances;
  }, [data.performances, hidePastPerformances]);

  const hasNoFavoritePerformances = (data.performances ?? []).length === 0;

  const handleHidePastPerformancesChange = (checked: boolean) => {
    logClickEvent({
      name: 'click_my_confeti_hide_past_toggle',
      params: { checked },
    });
    setHidePastPerformances(checked);
  };

  return (
    <div className={styles.pageContainer}>
      <LogShowEvent name="show_my_confeti" />
      <DetailHeader title="선호하는 공연" />
      <section className={styles.filterSection}>
        <nav>
          <ul className={styles.chipList}>
            {categories.map((category) => (
              <li key={category}>
                <LogClickEvent
                  name="click_my_confeti_category"
                  params={{
                    category,
                  }}
                >
                  <Chip
                    variant="choice"
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                    className={styles.chip}
                  >
                    {category}
                  </Chip>
                </LogClickEvent>
              </li>
            ))}
          </ul>
        </nav>
        {!hasNoFavoritePerformances && (
          <PastPerformanceToggle
            checked={hidePastPerformances}
            onChange={handleHidePastPerformancesChange}
          />
        )}
      </section>
      <Spacing size="md" color="white" />
      {hasNoFavoritePerformances ? (
        <EmptyPerformance />
      ) : (
        <PerformanceList performances={displayedPerformances} />
      )}
      <Footer />
    </div>
  );
};

export default PerformanceMore;
