import { useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useSearchLogic = () => {
  const [barFocus, setBarFocus] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const paramsKeyword = searchParams.get('q') || '';
  const selectedArtistId = searchParams.get('aid');
  const selectedPerformanceId = searchParams.get('pid');

  const handleNavigateWithKeyword = (keyword: string) => {
    if (!keyword.trim()) return;

    navigate(`/search?q=${encodeURIComponent(keyword)}`);
    setBarFocus(false);
  };

  const handleSelectKeyword = useCallback(
    (keyword: string, id: string | number, type: 'artist' | 'performance') => {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('q', keyword);

      if (type === 'artist') {
        newParams.set('aid', String(id));
        newParams.delete('pid');
      } else if (type === 'performance') {
        newParams.set('pid', String(id));
        newParams.delete('aid');
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const handleOnFocus = () => setBarFocus(true);
  const handleOnBlur = () => setBarFocus(false);
  const handleClear = () => setSearchParams(new URLSearchParams());

  return {
    searchParams,
    paramsKeyword,
    selectedArtistId,
    selectedPerformanceId,
    barFocus,
    handleNavigateWithKeyword,
    handleSelectKeyword,
    handleOnFocus,
    handleOnBlur,
    handleClear,
  };
};
