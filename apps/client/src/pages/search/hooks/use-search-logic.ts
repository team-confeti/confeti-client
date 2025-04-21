import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { routePath } from '@shared/constants/path';

import { useSearchArtist } from '../hooks/use-search-data';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';

  const searchData = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);

  const navigateWithKeyword = (keyword: string) => {
    navigate(`${routePath.SEARCH}?q=${keyword}`);
    setBarFocus(false);
  };

  return {
    artistData: searchData?.artist,
    paramsKeyword,
    barFocus,
    handleOnFocus,
    handleOnBlur,
    navigateWithKeyword,
  };
};
