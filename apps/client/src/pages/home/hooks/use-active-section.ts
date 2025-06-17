import { useEffect, useState } from 'react';

import { HOME_CATEGORY_TAB } from '../constants/tab';

interface ScrollRefs {
  ticketing: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  suggestPerformance: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
  suggestMusic: {
    element: React.RefObject<HTMLElement | null>;
    onMoveToElement: () => void;
  };
}

export const useActiveSection = (scrollRefs: ScrollRefs) => {
  const [currentCategory, setCurrentCategory] = useState<HOME_CATEGORY_TAB>(
    HOME_CATEGORY_TAB.TICKETING,
  );
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);

  useEffect(() => {
    if (isScrollingByClick) return;

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      const suggestPerformanceTop =
        scrollRefs.suggestPerformance.element.current?.offsetTop || 0;
      const suggestMusicTop =
        scrollRefs.suggestMusic.element.current?.offsetTop || 0;

      console.log(suggestPerformanceTop, suggestMusicTop, scrollY);

      switch (true) {
        case scrollY >= suggestMusicTop - 450:
          setCurrentCategory(HOME_CATEGORY_TAB.PLAYLIST);
          break;
        case scrollY >= suggestPerformanceTop - 400:
          setCurrentCategory(HOME_CATEGORY_TAB.SUGGEST_PERFORMANCE);
          break;
        default:
          setCurrentCategory(HOME_CATEGORY_TAB.TICKETING);
          break;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollRefs, isScrollingByClick]);

  const handleCategoryClick = (category: HOME_CATEGORY_TAB) => {
    setCurrentCategory(category);
    setIsScrollingByClick(true);

    switch (category) {
      case HOME_CATEGORY_TAB.TICKETING:
        scrollRefs.ticketing.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.SUGGEST_PERFORMANCE:
        scrollRefs.suggestPerformance.onMoveToElement();
        break;
      case HOME_CATEGORY_TAB.PLAYLIST:
        scrollRefs.suggestMusic.onMoveToElement();
        break;
      default:
        scrollRefs.ticketing.onMoveToElement();
        break;
    }

    setTimeout(() => {
      setIsScrollingByClick(false);
    }, 500);
  };

  return { currentCategory, handleCategoryClick };
};
