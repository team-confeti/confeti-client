import { useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import Loading from '@shared/pages/loading/loading';
import { useInfiniteScroll } from '@shared/utils/use-infinite-scroll';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import {
  useSearchArtist,
  useSearchPerformances,
  useSearchRelatedKeyword,
} from '../hooks/use-search-data';
import { useSearchLogic } from '../hooks/use-search-logic';
import SearchResult from './search-result-page';

import * as styles from './search-page.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';

  const { handleOnFocus, handleOnBlur, navigateWithKeyword } = useSearchLogic();
  const {
    keyword: searchKeyword,
    debouncedKeyword,
    handleInputChange,
  } = useDebouncedKeyword();
  const { data: artistData, isLoading: isSearchLoading } = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });
  const { data: relatedKeywordsData, isLoading: isRelatedKeywordLoading } =
    useSearchRelatedKeyword({
      keyword: debouncedKeyword,
      enabled: !!debouncedKeyword.trim(),
    });
  const { performances, performanceCount, fetchNextPage, hasNextPage } =
    useSearchPerformances({
      artistId: artistData?.artist?.artistId || '',
      enabled: !!artistData?.artist?.artistId,
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchKeyword.trim()) {
      navigateWithKeyword(searchKeyword);
      (e.target as HTMLInputElement).blur();
    }
  };

  // TODO: 무한 스크롤 제거
  const observerRef = useInfiniteScroll(hasNextPage, fetchNextPage);

  const renderSearchContents = () => {
    const isInitialState = !paramsKeyword && searchKeyword.length === 0;
    const isLoadingState = isRelatedKeywordLoading || isSearchLoading;
    const isSuggestionState =
      !!searchKeyword && (relatedKeywordsData?.artists?.length ?? 0) > 0;
    const isResultState = !!paramsKeyword;

    switch (true) {
      case isInitialState:
        return (
          <main className={styles.resultSection}>
            <RecentSearchSection />
            <PopularSearchSection />
            <RecentFestivalSection />
          </main>
        );

      case isLoadingState:
        return <Loading />;

      case isSuggestionState:
        return (
          <SearchSuggestionList relatedKeyword={relatedKeywordsData?.artists} />
        );

      case isResultState:
        return (
          <SearchResult
            artistData={artistData?.artist ?? null}
            performanceCount={performanceCount}
            performances={performances}
            hasNextPage={hasNextPage}
            observerRef={observerRef}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBarFrame}>
          <SearchBar
            value={searchKeyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            placeholder="아티스트 또는 공연을 검색해보세요!"
          />
        </div>
      </div>

      {renderSearchContents()}
    </>
  );
};

export default SearchPage;
