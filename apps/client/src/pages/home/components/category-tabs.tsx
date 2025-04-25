import { useState } from 'react';

import { Chip } from '@confeti/design-system';

import * as styles from './category-tabs.css';

const CategoryTabs = ({
  scrollHandlers,
}: {
  scrollHandlers: {
    ticketing: () => void;
    suggestPerformance: () => void;
    suggestMusic: () => void;
  };
}) => {
  const categories = [
    { label: '티켓 오픈', onClick: scrollHandlers.ticketing },
    { label: '추천 공연', onClick: scrollHandlers.suggestPerformance },
    { label: '플레이리스트', onClick: scrollHandlers.suggestMusic },
  ];
  const [selectedCategory, setSelectedCategory] = useState('티켓 오픈');

  return (
    <nav>
      <ul className={styles.chipList}>
        {categories.map(({ label, onClick }) => (
          <li key={label}>
            <Chip
              label={label}
              variant={selectedCategory === label ? 'active' : 'default'}
              onClick={() => {
                setSelectedCategory(label);
                onClick();
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryTabs;
