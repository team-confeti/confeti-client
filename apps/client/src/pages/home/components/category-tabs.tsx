import { Chip } from '@confeti/design-system';

import { HOME_CATEGORY_TAB } from '../constants/tab';

import * as styles from './category-tabs.css';

interface Props {
  selectedCategory: HOME_CATEGORY_TAB;
  onCategoryClick: (category: HOME_CATEGORY_TAB) => void;
}

const CategoryTabs = ({ selectedCategory, onCategoryClick }: Props) => {
  const categories = [
    HOME_CATEGORY_TAB.TICKETING,
    HOME_CATEGORY_TAB.SUGGEST_PERFORMANCE,
    HOME_CATEGORY_TAB.PLAYLIST,
  ];

  return (
    <nav className={styles.container}>
      <ul className={styles.chipList}>
        {categories.map((label) => (
          <li key={label}>
            <Chip
              label={label}
              variant={selectedCategory === label ? 'active' : 'default'}
              onClick={() => onCategoryClick(label)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryTabs;
