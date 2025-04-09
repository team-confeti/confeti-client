import { useState } from 'react';

import { Performance } from '@shared/types/user-response';

type Category = '전체' | '콘서트' | '페스티벌';

const categoryToTypeMap: Record<Category, string | null> = {
  전체: null,
  콘서트: 'concert',
  페스티벌: 'festival',
};

export const useFilteredPerformances = (performances: Performance[]) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');

  const filteredPerformances = performances.filter((performance) => {
    const targetType = categoryToTypeMap[selectedCategory];
    return targetType ? performance.type === targetType : true;
  });

  return {
    selectedCategory,
    setSelectedCategory,
    filteredPerformances,
  };
};
