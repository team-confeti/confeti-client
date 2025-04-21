import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import SearchResult from '../components/search-result/search-result';
import {
  useSearchPerformances,
  useSearchRelatedKeyword,
} from '../hooks/use-search-data';
import { useSearchLogic } from '../hooks/use-search-logic';

import * as styles from './search-page.css';

const SearchPage = () => {
  const {
    artistData,
    paramsKeyword,
    handleOnFocus,
    handleOnBlur,
    navigateWithKeyword,
  } = useSearchLogic();
  const {
    keyword: searchKeyword,
    debouncedKeyword,
    handleInputChange,
  } = useDebouncedKeyword();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      navigateWithKeyword(searchKeyword);
      (e.target as HTMLInputElement).blur();
    }
  };

  const artistId = artistData[0]?.artistId || '';
  const { performances, performanceCount, fetchNextPage, hasNextPage } =
    useSearchPerformances({
      artistId,
      enabled: !!artistId,
    });

  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);

  const relatedKeywordsData = useSearchRelatedKeyword({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const hasArtistResults = (relatedKeywordsData?.artists?.length ?? 0) > 0;

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            value={searchKeyword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder="아티스트 또는 공연을 검색해보세요!"
          />
        </div>
      </div>

      {!!searchKeyword && hasArtistResults && (
        <SearchSuggestionList relatedKeyword={relatedKeywordsData?.artists} />
      )}

      {!paramsKeyword && searchKeyword.length === 0 && (
        <main className={styles.resultSection}>
          <RecentSearchSection />
          <PopularSearchSection />
          <RecentFestivalSection />
        </main>
      )}

      {paramsKeyword && (
        <SearchResult
          artistData={artistData}
          performanceCount={performanceCount}
          performances={performances}
          hasNextPage={hasNextPage}
          observerRef={observerRef}
        />
      )}
    </>
  );
};

export default SearchPage;
