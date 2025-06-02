import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { SEARCH_ARTIST_QUERY_OPTIONS } from '@shared/apis/search/search-artist-queries';
import { SEARCH_PAGE_QUERY_OPTIONS } from '@shared/apis/search/search-page-queries';
import { SEARCH_PERFORMANCE_QUERY_OPTIONS } from '@shared/apis/search/search-performance-queries';
import { SwitchCase } from '@shared/components/switch-case';
import { useRelatedSearch } from '@shared/hooks/queries/use-related-search-queries';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import Loading from '@shared/pages/loading/loading';
import { getRecentViewItems } from '@shared/utils/recent-view';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import { useRecentSearch } from '../hooks/use-recent-search';
import { useSearchLogic } from '../hooks/use-search-logic';
import SearchResult from './search-result-page';

import * as styles from './search-page.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const paramsKeyword = searchParams.get('q') || '';
  const [isPerformanceAnalysisTriggered, setIsPerformanceAnalysisTriggered] =
    useState(false);

  const { barFocus, handleOnFocus, handleOnBlur, handleNavigateWithKeyword } =
    useSearchLogic();
  const { addSearchKeyword } = useRecentSearch();

  const {
    keyword: searchKeyword,
    debouncedKeyword,
    handleInputChange,
  } = useDebouncedKeyword(paramsKeyword);
  const {
    data: artistData,
    isLoading: isSearchLoading,
    refetch: refetchArtist,
  } = useQuery({
    ...SEARCH_ARTIST_QUERY_OPTIONS.SEARCH_ARTIST(
      paramsKeyword,
      !!paramsKeyword,
    ),
  });

  const { data: popularSearchData } = useSuspenseQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.SEARCH_POPULAR_SEARCH(),
  });
  const recentViewItems = getRecentViewItems();
  const items = recentViewItems
    .map((item) => `${item.type}:${item.typeId}`)
    .join(',');
  const { data: recentViewData } = useQuery({
    ...SEARCH_PAGE_QUERY_OPTIONS.RECENT_VIEW(items, items.length > 0),
  });

  const {
    data: { relatedArtists, relatedPerformances },
    isLoading: isRelatedKeywordLoading,
  } = useRelatedSearch({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const { data: performanceTypeAnalysisData } = useQuery({
    ...SEARCH_PERFORMANCE_QUERY_OPTIONS.SEARCH_PERFORMANCE_TYPE_ANALYSIS(
      searchKeyword,
      !!searchKeyword.trim() && isPerformanceAnalysisTriggered,
    ),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      !e.nativeEvent.isComposing &&
      searchKeyword.trim()
    ) {
      setIsPerformanceAnalysisTriggered(true);
      addSearchKeyword(searchKeyword);
      handleNavigateWithKeyword(searchKeyword);
      (e.target as HTMLInputElement).blur();
    }
  };

  const SuggestionContent = () => (
    <>
      <SearchSuggestionList
        relatedKeyword={relatedArtists?.artists?.map((artist) => ({
          id: artist.artistId,
          title: artist.name,
          profileUrl: artist.profileUrl,
        }))}
        onSelectKeyword={handleNavigateWithKeyword}
      />
      <SearchSuggestionList
        relatedKeyword={relatedPerformances?.performances?.map(
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

  const ResultContent = () => (
    <SearchResult
      artistData={artistData?.artist ?? null}
      relatedPerformances={relatedPerformances ?? null}
      performanceTypeAnalysisData={performanceTypeAnalysisData ?? null}
      refetchArtist={refetchArtist}
    />
  );

  const DefaultContent = () => (
    <main className={styles.resultSection}>
      <RecentSearchSection />
      <PopularSearchSection popularSearchData={popularSearchData} />
      <RecentFestivalSection recentViewData={recentViewData ?? null} />
    </main>
  );

  const searchState =
    isSearchLoading || isRelatedKeywordLoading
      ? 'loading'
      : !!relatedArtists?.artists && barFocus
        ? 'suggestion'
        : artistData
          ? 'result'
          : 'default';

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

          <SwitchCase
            value={searchState}
            caseBy={{
              loading: () => <Loading />,
              suggestion: () => <SuggestionContent />,
              result: () => <ResultContent />,
            }}
            defaultComponent={() => <DefaultContent />}
          />
        </>
      )}
    </>
  );
};

export default SearchPage;
