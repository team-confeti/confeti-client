import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleNavigateWithKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setBarFocus(false);
  };

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);
  const handleClear = () => setSearchParams(new URLSearchParams());

  return {
    barFocus,
    handleOnFocus,
    handleOnBlur,
    handleNavigateWithKeyword,
    handleClear,
  };
};
