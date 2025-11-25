import { useMemo, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Chip, Spacing } from '@confeti/design-system';

import { USER_QUERY_OPTIONS } from '@shared/apis/user/user-queries';
import { DetailHeader, Footer } from '@shared/components';
import { PerformancesFilterType } from '@shared/types/user-response';

import PerformanceList from '@pages/my/components/performance/performance-list';

import { PastPerformanceToggle } from './past-performance-toggle';

import * as styles from './performance-more.css';

const categories = ['전체', '콘서트', '페스티벌'] as const;

const PerformanceMore = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
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

  return (
    <>
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
        <PastPerformanceToggle />
      </section>
      <Spacing size="md" color="white" />
      <PerformanceList performances={data.performances ?? []} />
      <Footer />
    </>
  );
};

export default PerformanceMore;
