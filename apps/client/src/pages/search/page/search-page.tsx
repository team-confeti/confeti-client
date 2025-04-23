import { useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import Loading from '@shared/pages/loading/loading';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import { useRelatedSearch, useSearchArtist } from '../hooks/use-search-data';
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

  const {
    relatedArtistsData,
    relatedPerformancesData,
    isLoading: isRelatedKeywordLoading,
  } = useRelatedSearch({
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
    const isLoadingState = isRelatedKeywordLoading || isSearchLoading;
    const isSuggestionState = !!relatedArtistsData?.artists;
    const isResultState = !!artistData;

    switch (true) {
      case isLoadingState:
        return <Loading />;

      case isSuggestionState:
        return (
          <>
            <SearchSuggestionList
              relatedKeyword={relatedArtistsData?.artists?.map((artist) => ({
                id: artist.artistId,
                title: artist.name,
                profileUrl: artist.profileUrl,
              }))}
              onSelectKeyword={handleNavigateWithKeyword}
            />
            <SearchSuggestionList
              relatedKeyword={relatedPerformancesData?.performances?.map(
                (performance) => ({
                  id: performance.id,
                  title: performance.title,
                  profileUrl: performance.posterUrl,
                }),
              )}
              onSelectKeyword={handleNavigateWithKeyword}
              listType="performance"
            />
          </>
        );

      case isResultState:
        return <SearchResult artistData={artistData?.artist ?? null} />;

      default:
        return (
          <main className={styles.resultSection}>
            <RecentSearchSection />
            <PopularSearchSection />
            <RecentFestivalSection />
          </main>
        );
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
