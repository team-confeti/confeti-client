import { useMemo } from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { SEARCH_PAGE_QUERY_OPTIONS } from '@shared/apis/search/search-page-queries';
import { SEARCH_QUERY_OPTIONS } from '@shared/apis/search/search-queries';
import { SwitchCase } from '@shared/components/switch-case';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useKeyboard } from '@shared/hooks/use-keyboard';
import Loading from '@shared/pages/loading/loading';
import { getRecentViewItems } from '@shared/utils/recent-view';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import ArtistNotFound from '../components/search-result/artist/artist-not-found';
import { useRecentSearch } from '../hooks/use-recent-search';
import { useSearchLogic } from '../hooks/use-search-logic';
import SearchResult from './search-result-page';

import * as styles from './search-page.css';

const SearchPage = () => {
  const {
    paramsKeyword,
    selectedArtistId,
    selectedPerformanceId,
    barFocus,
    isSelecting,
    handleOnFocus,
    handleOnBlur,
    handleClear,
    handleNavigateWithKeyword,
    handleSelectKeyword,
  } = useSearchLogic();

  const recentViewItems = getRecentViewItems();
  const items = recentViewItems
    .map((item) => `${item.type}:${item.typeId}`)
    .join(',');
  const { data: recentViewData } = useQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.RECENT_VIEW(items, items.length > 0),
  });
  const { data: popularSearchData } = useSuspenseQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.SEARCH_POPULAR_SEARCH(10),
  });

  const {
    keyword: searchKeyword,
    debouncedKeyword,
    handleInputChange,
  } = useDebouncedKeyword(paramsKeyword);

  const {
    data: { relatedArtists, relatedPerformances },
    isLoading: isRelatedKeywordLoading,
  } = useRelatedSearch({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const {
    data: searchAllData,
    isLoading: isSearchLoading,
    refetch: refetchArtist,
  } = useQuery({
    ...SEARCH_QUERY_OPTIONS.SEARCH_ALL(
      selectedArtistId,
      selectedPerformanceId,
      paramsKeyword,
      !!paramsKeyword.trim() || !!selectedArtistId || !!selectedPerformanceId,
    ),
  });

  const { addSearchKeyword } = useRecentSearch();
  const { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (e.key === 'Escape') {
        (e.target as HTMLInputElement).blur();
      }
    },
    onKeyUp: (e) => {
      if (
        e.key === 'Enter' &&
        !e.nativeEvent.isComposing &&
        searchKeyword.trim()
      ) {
        handleNavigateWithKeyword(searchKeyword);
        addSearchKeyword(searchKeyword);
        (e.target as HTMLInputElement).blur();
      }
    },
  });

  const SuggestionContent = useMemo(
    () => (
      <>
        <SearchSuggestionList
          relatedKeyword={relatedArtists?.artists?.map((artist) => ({
            id: artist.artistId,
            title: artist.name,
            profileUrl: artist.profileUrl,
          }))}
          onSelectKeyword={(keyword, id) => {
            handleSelectKeyword(keyword, id, 'artist');
            addSearchKeyword(keyword);
          }}
        />
        <SearchSuggestionList
          relatedKeyword={relatedPerformances?.performances?.map(
            (performance) => ({
              id: performance.id,
              title: performance.title,
              profileUrl: performance.posterUrl,
            }),
          )}
          onSelectKeyword={(keyword, id) => {
            handleSelectKeyword(keyword, id, 'performance');
            addSearchKeyword(keyword);
          }}
          listType="performance"
        />
      </>
    ),
    [
      relatedArtists?.artists,
      relatedPerformances?.performances,
      handleSelectKeyword,
      addSearchKeyword,
    ],
  );

  const ResultContent = useMemo(
    () => (
      <SearchResult
        searchData={searchAllData ?? null}
        refetchArtist={refetchArtist}
      />
    ),
    [searchAllData, refetchArtist],
  );

  const DefaultContent = useMemo(
    () => (
      <main className={styles.resultSection}>
        <RecentSearchSection />
        <PopularSearchSection popularSearchData={popularSearchData} />
        <RecentFestivalSection recentViewData={recentViewData ?? null} />
      </main>
    ),
    [popularSearchData, recentViewData],
  );

  const searchState = () => {
    if (isSearchLoading || isRelatedKeywordLoading) {
      return 'loading';
    }
    if (isSelecting) {
      return 'suggestion';
    }
    if (
      searchAllData?.artist === null &&
      searchAllData?.performanceCount === 0
    ) {
      return 'notFound';
    }
    if (barFocus && relatedArtists?.artists) {
      return 'suggestion';
    }
    if (paramsKeyword || (searchAllData && !barFocus)) {
      return 'result';
    }
    return 'default';
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
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onClear={handleClear}
                placeholder="아티스트 또는 공연을 검색해보세요!"
                {...keyboardProps}
              />
            </div>
          </div>
          <SwitchCase
            value={searchState()}
            caseBy={{
              loading: () => <Loading />,
              notFound: () => <ArtistNotFound />,
              suggestion: () => SuggestionContent,
              result: () => ResultContent,
            }}
            defaultComponent={() => DefaultContent}
          />
        </>
      )}
    </>
  );
};

export default SearchPage;
