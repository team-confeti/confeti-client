import PerformanceList from '@pages/my/components/performance/performance-list';
import { useFilteredPerformances } from '@pages/my/hooks/use-filter-performances';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';

import { Chip, Footer, Header } from '@confeti/design-system';

import * as styles from './performance-more.css';

const ConfetiMore = () => {
  const { data } = useMyConfeti();
  const categories = ['전체', '콘서트', '페스티벌'] as const;

  const { selectedCategory, setSelectedCategory, filteredPerformances } =
    useFilteredPerformances(data?.performances || []);

  console.log(data?.performances);

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

      <PerformanceList performances={filteredPerformances} />

      <Footer />
    </>
  );
};

export default ConfetiMore;
