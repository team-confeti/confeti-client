import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecentSearch } from './use-recent-search';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();
  // TODO: 커스텀 훅간 의존성 해결
  const { addSearchKeyword } = useRecentSearch();

  const handleNavigateWithKeyword = (keyword: string) => {
    if (!keyword.trim()) return;
    addSearchKeyword(keyword);
    navigate(`/search?q=${encodeURIComponent(keyword)}`);
  };

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);

  return {
    barFocus,
    handleOnFocus,
    handleOnBlur,
    handleNavigateWithKeyword,
  };
};
