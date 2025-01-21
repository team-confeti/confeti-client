import React from 'react';
import * as styles from './search.css';
import { useNavigate, useSearchParams } from 'react-router-dom'; // useSearchParams 추가
import { SearchBar, Spacing, Footer } from '@confeti/design-system';
import { routePath } from '@shared/constants/path';
import NoticeSection from '@pages/search/components/notice-section';
import ArtistSection from '@pages/search/components/artist-section';
import PerformanceSection from '@pages/search/components/performance-section';
import PerformanceCount from '@pages/search/components/performance-count-section';
import ArtistNotFound from '@pages/search/components/artist-not-found';
import { useSearch } from '@pages/search/hooks/use-search';
import { useSearchArtist } from '../hooks/use-search-result';

const Search = () => {
  const { searchKeyword, setSearchKeyword } = useSearch();
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

  return (
    <>
      <SearchBar onChange={handleOnChange} onKeyDown={handleKeydown} />
      <main className={styles.resultSection}>
        {paramsKeyword.length > 0 ? (
          <>
            <NoticeSection
              isMultipleArtists={artistData[0]?.isMultipleArtists}
            />
            <ArtistSection artist={artistData} />
            <Spacing />
            <PerformanceCount />
            <PerformanceSection />
          </>
        ) : (
          <ArtistNotFound />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Search;
