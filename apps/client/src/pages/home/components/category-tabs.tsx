import { useState } from 'react';

import { Chip } from '@confeti/design-system';

import * as styles from './category-tabs.css';

const CategoryTabs = () => {
  const categories = ['티켓 오픈', '추천 공연', '플레이리스트'] as const;

  const [selectedCategory, setSelectedCategory] = useState('티켓 오픈');

  return (
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
  );
};

export default CategoryTabs;
