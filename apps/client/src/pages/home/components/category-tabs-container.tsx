import { useActiveSection } from '../hooks/use-active-section';
import CategoryTabs from './category-tabs';

interface Props {
  scrollRefs: {
    ticketing: {
      onMoveToElement: () => void;
      element: React.RefObject<HTMLElement | null>;
    };
    suggestPerformance: {
      onMoveToElement: () => void;
      element: React.RefObject<HTMLElement | null>;
    };
    suggestMusic: {
      onMoveToElement: () => void;
      element: React.RefObject<HTMLElement | null>;
    };
  };
}

const CategoryTabsContainer = ({ scrollRefs }: Props) => {
  const { currentCategory, handleCategoryClick } = useActiveSection(scrollRefs);

  return (
    <CategoryTabs
      selectedCategory={currentCategory}
      onCategoryClick={handleCategoryClick}
    />
  );
};

export default CategoryTabsContainer;
