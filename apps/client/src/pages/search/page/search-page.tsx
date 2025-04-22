import { useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import Loading from '@shared/pages/loading/loading';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import {
  useSearchArtist,
  useSearchRelatedKeyword,
} from '../hooks/use-search-data';
import { useSearchLogic } from '../hooks/use-search-logic';
import SearchResult from './search-result-page';

import * as styles from './search-page.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';

  const { handleOnFocus, handleOnBlur, handleNavigateWithKeyword } =
    useSearchLogic();
  const {
    keyword: searchKeyword,
    debouncedKeyword,
    handleInputChange,
  } = useDebouncedKeyword(paramsKeyword);
  const { data: artistData, isLoading: isSearchLoading } = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });
  const { data: relatedKeywordsData, isLoading: isRelatedKeywordLoading } =
    useSearchRelatedKeyword({
      keyword: debouncedKeyword,
      enabled: !!debouncedKeyword.trim(),
    });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      !e.nativeEvent.isComposing &&
      searchKeyword.trim()
    ) {
      handleNavigateWithKeyword(searchKeyword);
      (e.target as HTMLInputElement).blur();
    }
  };

  const renderSearchContents = () => {
    const isInitialState = !paramsKeyword && !searchKeyword;
    const isLoadingState = isRelatedKeywordLoading || isSearchLoading;
    const isSuggestionState = !!relatedKeywordsData?.artists;
    const isResultState = !!artistData;

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
          <SearchSuggestionList
            relatedKeyword={relatedKeywordsData?.artists}
            onClick={handleNavigateWithKeyword}
          />
        );

      case isResultState:
        return <SearchResult artistData={artistData?.artist ?? null} />;

      default:
        return null;
    }
  };

  return (
    <>
      {isSearchLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default SearchPage;
