import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();

  const handleNavigateWithKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setBarFocus(false);
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
