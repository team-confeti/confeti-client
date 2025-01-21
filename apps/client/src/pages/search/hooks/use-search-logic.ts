import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSearchArtist } from '../hooks/use-search-data';
import { useSearchState } from '@pages/search/hooks/use-search-state';
import { routePath } from '@shared/constants/path';

export const useSearchLogic = () => {
  const { searchKeyword, setSearchKeyword } = useSearchState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchKeyword;

  const paramsKeyword = searchParams.get('q') || '';
  const searchData = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });

  const artistData = searchData?.artist ? [searchData.artist] : [];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim()) {
      navigate(`${routePath.SEARCH}?q=${keyword}`);
    }
  };

  return {
    searchKeyword,
    artistData,
    paramsKeyword,
    handleOnChange,
    handleKeydown,
  };
};
