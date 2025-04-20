import { useMemo, useState } from 'react';
import PerformanceList from '@pages/my/components/performance/performance-list';
import { useMyPerformances } from '@pages/my/hooks/use-my-favorites';

import { Chip, Footer, Header } from '@confeti/design-system';

import * as styles from './performance-more.css';

const categories = ['전체', '콘서트', '페스티벌'] as const;

const ConfetiMore = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const filterType = useMemo(() => {
    switch (selectedCategory) {
      case '콘서트':
        return 'CONCERT';
      case '페스티벌':
        return 'FESTIVAL';
      default:
        return 'ALL';
    }
  }, [selectedCategory]);
  const { data } = useMyPerformances(filterType);

  return (
    <>
      <Header variant="detail" title="My Confeti" />
      <nav>
        <ul className={styles.chipList}>
          {categories.map((category) => (
            <li key={category}>
              <Chip
                label={category}
                variant={selectedCategory === category ? 'active' : 'default'}
                onClick={() => setSelectedCategory(category)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <PerformanceList performances={data.performances ?? []} />
      <Footer />
    </>
  );
};

export default ConfetiMore;
