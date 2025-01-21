import { useState } from 'react';

export const useSearch = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  return {
    searchKeyword,
    setSearchKeyword,
  };
};
