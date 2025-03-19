import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { routePath } from '@shared/constants/path';

import { useSearchArtist } from '../hooks/use-search-data';

export const useSearchLogic = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [barFocus, setBarFocus] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';

  const searchData = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });
  const artistData = searchData?.artist ? [searchData.artist] : [];

  // 이벤트 핸들러
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      e.preventDefault();
      setTimeout(() => {
        navigate(`${routePath.SEARCH}?q=${searchKeyword}`);
        setBarFocus(false);
        setSearchKeyword('');
        (e.target as HTMLInputElement).blur();
      }, 0);
    }
  };

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);

  return {
    searchKeyword,
    artistData,
    barFocus,
    paramsKeyword,
    handleOnChange,
    handleKeydown,
    handleOnFocus,
    handleOnBlur,
  };
};
