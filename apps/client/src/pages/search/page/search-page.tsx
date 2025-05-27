import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { SearchBar, SearchSuggestionList } from '@confeti/design-system';
import { SwitchCase } from '@shared/components/switch-case';
import { useDebouncedKeyword } from '@shared/hooks/use-debounce-keyword';
import { useRelatedSearch } from '@shared/hooks/use-related-search';
import Loading from '@shared/pages/loading/loading';
import { getRecentViewItems } from '@shared/utils/recent-view';

import PopularSearchSection from '../components/search-home/popular-search-section';
import RecentFestivalSection from '../components/search-home/recent-festivals-section';
import RecentSearchSection from '../components/search-home/recent-search-section';
import { useRecentSearch } from '../hooks/use-recent-search';
import {
  usePerformanceTypeAnalysis,
  usePopularSearch,
  useRecentView,
  useSearchArtist,
} from '../hooks/use-search-data';
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
  } = useSearchArtist({
    keyword: paramsKeyword,
    enabled: !!paramsKeyword,
  });
  const { data: popularSearchData } = usePopularSearch();
  const recentViewItems = getRecentViewItems();
  const items = recentViewItems
    .map((item) => `${item.type}:${item.typeId}`)
    .join(',');
  const { data: recentViewData } = useRecentView(items, items.length > 0);

  const {
    data: { relatedArtists, relatedPerformances },
    isLoading: isRelatedKeywordLoading,
  } = useRelatedSearch({
    keyword: debouncedKeyword,
    enabled: !!debouncedKeyword.trim(),
  });

  const { data: performanceTypeAnalysisData } = usePerformanceTypeAnalysis({
    keyword: searchKeyword,
    enabled: !!searchKeyword.trim() && isPerformanceAnalysisTriggered,
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
              suggestion: () => (
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
              ),
              result: () => (
                <SearchResult
                  artistData={artistData?.artist ?? null}
                  relatedPerformances={relatedPerformances ?? null}
                  performanceTypeAnalysisData={
                    performanceTypeAnalysisData ?? null
                  }
                  refetchArtist={refetchArtist}
                />
              ),
            }}
            defaultComponent={() => (
              <main className={styles.resultSection}>
                <RecentSearchSection />
                <PopularSearchSection popularSearchData={popularSearchData} />
                <RecentFestivalSection
                  recentViewData={recentViewData ?? null}
                />
              </main>
            )}
          />
        </>
      )}
    </>
  );
};

export default SearchPage;
