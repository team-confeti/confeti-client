import { useEffect, useState } from 'react';

const RECENT_SEARCHES_KEY = 'recentSearches';

export const useRecentSearch = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  const addSearchKeyword = (keyword: string) => {
    setRecentSearches((prev) => {
      const updated = [keyword, ...prev.filter((k) => k !== keyword)].slice(
        0,
        10,
      ); // 중복 제거 + 최대 10개 저장
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeSearchKeyword = (keyword: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter((k) => k !== keyword);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearSearchKeywords = () => {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addSearchKeyword,
    removeSearchKeyword,
    clearSearchKeywords,
  };
};
