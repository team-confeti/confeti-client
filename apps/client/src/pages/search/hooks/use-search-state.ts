import { useState } from 'react';

export const useSearchState = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  return {
    searchKeyword,
    setSearchKeyword,
  };
};
