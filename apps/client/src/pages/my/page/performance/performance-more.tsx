import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Chip, Spacing } from '@confeti/design-system';

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

  return (
    <div className={styles.pageContainer}>
      <DetailHeader title="선호하는 공연" />
      <section className={styles.filterSection}>
        <nav>
          <ul className={styles.chipList}>
            {categories.map((category) => (
              <li key={category}>
                <Chip
                  variant="choice"
                  selected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                  className={styles.chip}
                >
                  {category}
                </Chip>
              </li>
            ))}
          </ul>
        </nav>
        {!hasNoFavoritePerformances && (
          <PastPerformanceToggle
            checked={hidePastPerformances}
            onChange={setHidePastPerformances}
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
