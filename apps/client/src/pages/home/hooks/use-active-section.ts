import { useEffect, useRef, useState } from 'react';

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
  const isScrollingByClick = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (isScrollingByClick.current) return;
      const scrollY = window.scrollY;
      const viewportMiddle = window.innerHeight / 2;

      const suggestPerformanceTop =
        scrollRefs.suggestPerformance.element.current?.offsetTop ?? 0;
      const suggestMusicTop =
        scrollRefs.suggestMusic.element.current?.offsetTop ?? 0;

      if (scrollY >= suggestMusicTop - viewportMiddle) {
        setCurrentCategory((prev) =>
          prev !== HOME_CATEGORY_TAB.PLAYLIST
            ? HOME_CATEGORY_TAB.PLAYLIST
            : prev,
        );
      } else if (scrollY >= suggestPerformanceTop - viewportMiddle) {
        setCurrentCategory((prev) =>
          prev !== HOME_CATEGORY_TAB.SUGGEST_PERFORMANCE
            ? HOME_CATEGORY_TAB.SUGGEST_PERFORMANCE
            : prev,
        );
      } else {
        setCurrentCategory((prev) =>
          prev !== HOME_CATEGORY_TAB.TICKETING
            ? HOME_CATEGORY_TAB.TICKETING
            : prev,
        );
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollRefs]);

  const handleCategoryClick = (category: HOME_CATEGORY_TAB) => {
    if (currentCategory === category) return;
    setCurrentCategory(category);
    isScrollingByClick.current = true;

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
    }

    setTimeout(() => {
      isScrollingByClick.current = false;
    }, 500);
  };

  return { currentCategory, handleCategoryClick };
};
