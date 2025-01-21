import { useState } from 'react';

export const useSearchState = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [barFocus, setBarFocus] = useState<boolean>(false);

  return {
    searchKeyword,
    setSearchKeyword,
    barFocus,
    setBarFocus,
  };
};
