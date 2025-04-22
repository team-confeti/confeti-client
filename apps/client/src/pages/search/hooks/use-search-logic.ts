import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);

  const handleNavigateWithKeyword = (keyword: string) => {
    navigate(`/search?q=${keyword}`);
    setBarFocus(false);
  };

  return {
    barFocus,
    handleOnFocus,
    handleOnBlur,
    handleNavigateWithKeyword,
  };
};
